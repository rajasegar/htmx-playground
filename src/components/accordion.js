class Accordion extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    this.heading = this.getAttribute('heading')
    template.innerHTML = `
<style>
summary {
  padding: .5em;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
summary:hover {
background-color: white;
}
</style>
<details ${this.hasAttribute('open') && 'open'}>
<summary>${this.heading}</summary>
<slot></slot>
</details>
`
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('hp-accordion', Accordion)
