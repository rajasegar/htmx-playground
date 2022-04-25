import { store } from '../store';
import updateProps from "../updateProps";

import "./children";
import '../components/accordion';
import './htmx';

class SpanPanel extends HTMLElement {
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
    const { components } = store.getState();
    const { props } = components[this.dataset.id];
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
<label  for="txt-id">ID:</label>
<input  type="text" id="txt-id" data-property="id" value="${props.id || ''}"/>
<label  for="txt-class">Class:</label>
<input  type="text" id="txt-class" data-property="class" value="${props.class || ''}"/>
<label  for="txt-children">Children:</label>
<textarea id="txt-children" data-property="children">
${props.children || ''}
</textarea>
</hp-accordion>
<htmx-panel data-id="${this.dataset.id}"/>
<children-panel data-id="${this.dataset.id}"></children-panel>`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("span-panel", SpanPanel);
