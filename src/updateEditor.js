import { renderButton, renderWithChildren,
	 render,
	 renderSelect
       } from "./renderFunctions";

import { store } from "./store";

import "./components/preview-container";
import generateCode from './generateCode';

export default function updateEditor() {
  const { components, builderMode } = store.getState();
  const editor = document.getElementById("editor");
  editor.onclick = () => {
    store.dispatch({
      type: "SELECT_COMPONENT",
      payload: { selectedId: "root" },
    });
  };
  // clear editor
  editor.innerHTML = "";

  components.root.children.forEach((id) => {
    const { type, props, children } = components[id];
    const preview = document.createElement("preview-container");
    preview.setAttribute("id", id);

    let child;
    switch (type) {
      case "button":
        child = renderButton(props);
        break;

      case "select":
        child = renderSelect(props);
        break;

      case "div":
        child = renderWithChildren(type, props, children);
        break;

      default:
	child = render(type, props);
        console.info("Editor: Default choice:", type);
    }

    preview.appendChild(child);
    editor.appendChild(preview);
  });

    console.log(generateCode());
}
