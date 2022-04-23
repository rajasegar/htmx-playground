import updateProps from "../updateProps";
import "./children";

class DefaultPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
	  
    this.render();

      this.addEventListener("input", (ev) => {
      const id = this.dataset.id;
      updateProps(ev, id);
	  
      });

  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
<style>
label {
    display: block;
    padding: .5em;
    margin: 0.25;
    color: var(--elephant);
}
input {
    padding: .5em;
    margin: 0.25em .5em;
    border-radius: 4px;
border: 1px solid var(--elephant);
    width: 90%;
}
</style>
<label  for="txt-name">Name:</label>
<input  type="text" id="txt-name" data-property="name"/>
<label  for="txt-hx-get">hx-get</label>
<input  type="text" id="txt-hx-get" data-property="hx-get"/>
<label  for="txt-hx-target">hx-target</label>
<input  type="text" id="txt-hx-target" data-property="hx-target"/>
<label  for="txt-hx-indicator">hx-indicator</label>
<input  type="text" id="txt-hx-indicator" data-property="hx-indicator"/>
<label  for="txt-hx-swap">hx-swap</label>
<input  type="text" id="txt-hx-swap" data-property="hx-swap"/>
<children-panel data-id="${this.dataset.id}"></children-panel>`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("default-panel", DefaultPanel);
