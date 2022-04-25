import { store } from '../store'
import { loadFromJSON, saveAsJSON } from '../utils/import'

const template = document.createElement('template')
template.innerHTML = `
 <style>
.dropbtn {
  background: transparent;
  color: white;
  padding: 0 1em;
  font-size: .85em;
  border: none;
  cursor: pointer;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-content a {
  color: var(--elephant);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
font-size: .75em;
}
.dropdown-content a:hover {
background-color: var(--smoke);
color: var(--sidebar-bg);
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
<div class="dropdown">
  <button class="dropbtn">Editor <fw-icon name="chevron-down" size="8"></fw-icon></button>
  <div class="dropdown-content">
    <a role="button" id="btnExport">Export components</a>
    <a role="button" id="btnImport">Import components</a>
    <a href="https://htmx.org" target="_blank">HTMX Docs</a>
  </div>
</div> 
`
class EditorMenu extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const exportbtn$ = this.shadowRoot.querySelector('#btnExport')
    exportbtn$.addEventListener('click', () => {
      const { components } = store.getState()
      saveAsJSON(components)
    })

    const importbtn$ = this.shadowRoot.querySelector('#btnImport')
    importbtn$.addEventListener('click', () => {
      ;(async () => {
        const components = await loadFromJSON()
        store.dispatch({
          type: 'IMPORT_COMPONENTS',
          payload: { components },
        })
      })()
    })
  }
}

window.customElements.define('editor-menu', EditorMenu)
