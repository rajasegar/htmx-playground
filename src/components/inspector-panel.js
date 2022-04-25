import { store } from "../store";
import "../panels/default";
import "../panels/div";
import "../panels/label";
import "../panels/button";
import "../panels/span";

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

      case "div":
        panel = `<div-panel data-id="${this.id}"></div-panel>`;
        this.renderPanel(type, panel);
	break;

      case "label":
        panel = `<label-panel data-id="${this.id}"></label-panel>`;
        this.renderPanel(type, panel);
	break;

      case "button":
        panel = `<button-panel data-id="${this.id}"></button-panel>`;
        this.renderPanel(type, panel);
	break;

      case "span":
        panel = `<span-panel data-id="${this.id}"></span-panel>`;
        this.renderPanel(type, panel);
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
    <button id="btn-copy-code"  title="Copy component code" color="secondary">
<img src=${copyIcon} alt="Copy Code"/>
 </button>
    <button id="btn-duplicate"  title="Duplicate" color="secondary">
<img src=${duplicateIcon} alt="Duplicate Component"/>
 </button>
    <button id="btn-reset-props"  title="Reset props" color="secondary">
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


      this.duplicateButton = this.shadowRoot.querySelector('#btn-duplicate');
      this.duplicateButton && this.duplicateButton.addEventListener('click', () => {
          store.dispatch({ type: "DUPLICATE_COMPONENT" });
      });

      this.deleteButton = this.shadowRoot.querySelector('#btn-delete');
      this.deleteButton && this.deleteButton.addEventListener('click', () => {
          store.dispatch({type: "DELETE_COMPONENT",});
      });


      this.resetPropsBtn = this.shadowRoot.querySelector('#btn-reset-props');
      this.resetPropsBtn && this.resetPropsBtn.addEventListener('click', () => {

          // dispatch reset props message
          store.dispatch({
            type: "RESET_PROPS",
            payload: {
              componentId: this.id,
            },
          });
      });
  }
}

window.customElements.define("inspector-panel", InspectorPanel);
