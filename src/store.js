import { createStore } from "redux";
import produce from "immer";
import DEFAULT_PROPS from "./defaultProps";
import { generateId } from "./utils/generateId";
import { duplicateComponent, deleteComponent } from "./utils/recursive";
import updateEditor from "./updateEditor";
import updateInspector from "./updateInspector";

const DEFAULT_ID = "root";

const initialState = {
  selectedId: "root",
  components: {
    root: {
      id: DEFAULT_ID,
      parent: DEFAULT_ID,
      type: "root",
      children: [],
      props: {},
    },
  },
  builderMode: true,
  showCode: false,
};

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "ADD_COMPONENT":
      return produce(state, (draftState) => {
        const id = payload.testId || generateId();
        const { form, ...defaultProps } = DEFAULT_PROPS[payload.type] || {};
        draftState.selectedId = id;
        draftState.components[payload.parentName].children.push(id);
        draftState.components[id] = {
          id,
          props: defaultProps || {},
          children: [],
          type: payload.type,
          parent: payload.parentName,
          rootParentType: payload.rootParentType || payload.type,
        };
      });

    case "UPDATE_PROPS":
      return produce(state, (draftState) => {
        draftState.components[payload.id].props[payload.name] = payload.value;
	  console.log(draftState);
      });

    case "UPDATE_CHILDREN":
      return produce(state, (draftState) => {
        draftState.components[payload.id].children = payload.children;
      });

    case "SELECT_COMPONENT":
      return {
        ...state,
        selectedId: payload.selectedId,
      };

    case "TOGGLE_BUILDER_MODE":
      return {
        ...state,
        builderMode: !state.builderMode,
      };

    case "TOGGLE_CODE_PANEL":
      return {
        ...state,
        showCode: !state.showCode,
      };

    case "DUPLICATE_COMPONENT":
      return produce(state, (draftState) => {
        const selectedComponent = draftState.components[draftState.selectedId];

        if (selectedComponent.id !== DEFAULT_ID) {
          const parentElement = draftState.components[selectedComponent.parent];

          const { newId, clonedComponents } = duplicateComponent(
            selectedComponent,
            draftState.components
          );

          draftState.components = {
            ...draftState.components,
            ...clonedComponents,
          };
          draftState.components[parentElement.id].children.push(newId);
        }
      });

    case "DELETE_COMPONENT":
      if (payload.componentId === "root") {
        return state;
      }

      return produce(state, (draftState) => {
        const component = draftState.components[payload.componentId];

        // Remove self
        if (component && component.parent) {
          const children = draftState.components[
            component.parent
          ].children.filter((id) => id !== payload.componentId);

          draftState.components[component.parent].children = children;
        }

        draftState.selectedId = DEFAULT_ID;
        draftState.components = deleteComponent(
          component,
          draftState.components
        );
      });

    case "CLEAR_EDITOR":
      return initialState;

    case "RESET_PROPS":
      return produce(state, (draftState) => {
        const component = draftState.components[payload.componentId];
        const { form, ...defaultProps } = DEFAULT_PROPS[component.type] || {};

        draftState.components[payload.componentId].props = defaultProps || {};
      });

    case "IMPORT_COMPONENTS":
      return produce(state, (draftState) => {
        draftState.components = payload.components;
      });

    default:
      return state;
  }
}

export const store = createStore(appReducer);

store.subscribe(() => {
  updateEditor();
  updateInspector(store.getState());
});
