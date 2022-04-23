import { store } from "../store";
import "../panels/default";

import duplicateIcon from '../icons/copy.svg';
import deleteIcon from '../icons/trash.svg';
import copyIcon from '../icons/code.svg';
import resetIcon from '../icons/refresh.svg';

class InspectorPanel extends HTMLElement {
  static get observedAttributes() {
    return ["id"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.id = this.getAttribute("id"); // selected component id

    this.addEventListener("fwClick", (ev) => {
      const path = ev.path || (ev.composedPath && ev.composedPath());
      const buttonId = path[0].id;
      switch (buttonId) {
        case "btn-copy-code":
          // dispatch copy code message
          break;

        case "btn-duplicate":
          // dispatch duplicate component message
          store.dispatch({ type: "DUPLICATE_COMPONENT" });
          break;

        case "btn-reset-props":
          // dispatch reset props message
          store.dispatch({
            type: "RESET_PROPS",
            payload: {
              componentId: this.id,
            },
          });
          break;

        case "btn-delete":
          // dispatch delete component  message
          store.dispatch({
            type: "DELETE_COMPONENT",
            payload: { componentId: this.id },
          });
          break;

        case "btn-crayon-docs":
          this._openDocs();
          break;

        default:
          console.error("InspectorPanel: Unknown action button");
      }
    });

    this.render();
  }

  _openDocs() {
    const { components } = store.getState();
    const { type } = components[this.id];
    const name = type.replace("fw-", "");
    const url = `https://crayons.freshworks.com/components/${name}/#usage`;
    window.open(url, "_blank");
  }

  attributeChangedCallback(attr, oldAttr, newAttr) {
    if (attr === "id" && oldAttr !== newAttr) {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = "";
    let panel = "";
    const { components } = store.getState();
    const { type } = components[this.id];

    switch (type) {
      case "root":
        panel = `<root-panel data-id="${this.id}"></root-panel>`;
        import(
          /* webpackChunkName: "root-panel" */
          /* webpackMode: "lazy" */
          /* webpackExports: ["default", "named"] */
          "../panels/root"
        ).then(() => {
          this.renderPanel(type, panel);
        });
        break;

      default:
        panel = `<default-panel data-id="${this.id}"></default-panel>`;
        this.renderPanel(type, panel);
        // console.error("Inspector: Unknown component");
    }
  }

  renderPanel(type, panel) {
    const template = document.createElement("template");
    const actionButtons = `
    <div class="action-buttons-wrapper">
    <button id="btn-copy-code" size="icon" title="Copy component code" color="secondary">
<img src=${copyIcon} alt="Copy Code"/>
 </button>
    <button id="btn-duplicate" size="icon" title="Duplicate" color="secondary">
<img src=${duplicateIcon} alt="Duplicate Component"/>
 </button>
    <button id="btn-reset-props" size="icon" title="Reset props" color="secondary">
<img src=${resetIcon} alt="Reset Props"/>
</button>
    <button id="btn-delete" title="Delete" color="secondary">
<img src=${deleteIcon} alt="Delete Component"/>
 </button>
    </div>
    `;

    template.innerHTML = `
    <style>

.action-buttons-wrapper {
padding: 0.5em;
}
      .inspector {
        background-color: var(--smoke);
        border-left: 1px solid var(--elephant);
        height: 100%;
      }
      button {
      margin: 0 0.5em;
cursor: pointer;
background: white;
border: 1px solid #ccc;
border-radius: 4px;
padding: 0.25em 0.5em;
      }
      h3 {
      padding: 0.25em 0.5em;
      margin: 0;
      background: #fefcbf;
      color: #5f370e;
      }
    </style>
      <div class="inspector" id="inspector">
      <h3>${type}</h3>
      ${this.id !== "root" ? actionButtons : ""}
      ${panel}
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("inspector-panel", InspectorPanel);
