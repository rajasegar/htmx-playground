import updateProps from '../updateProps'
import './children'

class RootPanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.addEventListener('fwChange', (ev) => {
      const id = this.dataset.id
      updateProps(ev, id)
    })

    this.render()
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = `<children-panel data-id="${this.dataset.id}"></children-panel>`
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('root-panel', RootPanel)
