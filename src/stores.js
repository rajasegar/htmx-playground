import { writable } from "svelte/store";
import produce from "immer";
import { generateId } from "./utils/generateId";
import { duplicateComponent, deleteComponent } from "./utils/recursive";
import DEFAULT_PROPS from "./defaultProps";

import { saveAsJSON } from "./utils/import";

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

function createEditor() {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    add: (payload) =>
      update((state) => {
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
      }),

    select: (id) =>
      update((state) => {
        return produce(state, (draftState) => {
          draftState.selectedId = id;
        });
      }),
    reset: () => set(initialState),
    importFromJson: (payload) =>
      update((state) => {
        return produce(state, (draftState) => {
          draftState.components = payload;
        });
      }),
    duplicate: () =>
      update((state) => {
        return produce(state, (draftState) => {
          const selectedComponent =
            draftState.components[draftState.selectedId];

          if (selectedComponent.id !== DEFAULT_ID) {
            const parentElement =
              draftState.components[selectedComponent.parent];

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
      }),

    remove: () =>
      update((state) => {
        return produce(state, (draftState) => {
          const component = draftState.components[draftState.selectedId];

          // Remove self
          if (component && component.parent) {
            const children = draftState.components[
              component.parent
            ].children.filter((id) => id !== draftState.selectedId);

            draftState.components[component.parent].children = children;
          }

          draftState.selectedId = DEFAULT_ID;
          draftState.components = deleteComponent(
            component,
            draftState.components
          );
        });
      }),

    updateProps: (payload) =>
      update((state) => {
        return produce(state, (draftState) => {
          const component = draftState.components[draftState.selectedId];
          component.props = {
            ...component.props,
            ...payload,
          };
        });
      }),

    toggleCode: () =>
      update((state) => {
        return produce(state, (draftState) => {
          draftState.showCode = !draftState.showCode;
        });
      }),

    exportJson: () =>
      update((state) => {
        saveAsJSON(state.components);
        return state;
      }),
  };
}

export const editor = createEditor();
