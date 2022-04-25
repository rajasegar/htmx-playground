import updateProps from "../updateProps";
import "./children";

import '../components/accordion';

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
font-size: 12px;
font-weight: bold;
    color: var(--elephant);
}
input, textarea {
    padding: .5em;
    margin: 0.25em .5em;
    border-radius: 4px;
    border: 1px solid var(--smoke600);
    width: 90%;
}
</style>
<hp-accordion heading="HTML Attributes" open>
<label  for="txt-name">Name:</label>
<input  type="text" id="txt-name" data-property="name"/>
<label  for="txt-id">ID:</label>
<input  type="text" id="txt-id" data-property="id"/>
<label  for="txt-class">Class:</label>
<input  type="text" id="txt-class" data-property="class"/>
<label  for="txt-children">Children:</label>
<textarea id="txt-children" data-property="children">
</textarea>
</hp-accordion>
<hp-accordion heading="HTMX Attributes" open>
<label  for="txt-hx-get">hx-get</label>
<input  type="text" id="txt-hx-get" data-property="hx-get"/>
<label  for="txt-hx-target">hx-target</label>
<input  type="text" id="txt-hx-target" data-property="hx-target"/>
<label  for="txt-hx-indicator">hx-indicator</label>
<input  type="text" id="txt-hx-indicator" data-property="hx-indicator"/>
<label  for="txt-hx-swap">hx-swap</label>
<input  type="text" id="txt-hx-swap" data-property="hx-swap"/>
</hp-accordion>
<children-panel data-id="${this.dataset.id}"></children-panel>`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("default-panel", DefaultPanel);
