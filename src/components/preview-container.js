import { store } from "../store";

const template = document.createElement("template");
template.innerHTML = `
<style>
.preview-wrapper {
  margin: 0.25em;
  padding: 1em;
  border: 1px dashed black;
  min-height: 1em;
}
.preview-wrapper:hover {
  border: 1px solid var(--elephant);
}
</style>
<div><slot></slot></div>
`;
class PreviewContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const div$ = this.shadowRoot.querySelector("div");
    const { builderMode } = store.getState();
    if (builderMode) {
      div$.className = "preview-wrapper";
    }
    div$.onclick = (ev) => {
      ev.stopPropagation();
      store.dispatch({
        type: "SELECT_COMPONENT",
        payload: { selectedId: this.getAttribute("id") },
      });
    };
    div$.addEventListener("drop", (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      const id = ev.dataTransfer.getData("id");
      const parentId = this.id;
      const payload = {
        type: id,
        parentName: parentId,
        rootParentType: "root",
      };

      store.dispatch({ type: "ADD_COMPONENT", payload });
    });

    div$.addEventListener("dragover", (ev) => {
      ev.preventDefault();
      div$.style.background = "aqua";
    });
  }
}

window.customElements.define("preview-container", PreviewContainer);
