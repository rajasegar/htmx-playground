import { store } from '../store'
import generateCode from '../generateCode'

class ToggleCodePanel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
      const toggle = this.shadowRoot.querySelector('input');
    toggle.addEventListener('click', (ev) => {
      const codePanel = document.getElementById('code-panel')
      codePanel.innerHTML = ''
      store.dispatch({
        type: 'TOGGLE_CODE_PANEL',
      })

      const copybtn = document.createElement('button')
      copybtn.id = 'btn-copy'
      copybtn.setAttribute('color', 'primary')
      copybtn.textContent = 'Copy'
      copybtn.onclick = () => {
        const markup = document.getElementById('markup').textContent
        navigator.clipboard.writeText(markup)
        copybtn.textContent = 'Copied!'
        setTimeout(() => {
          copybtn.textContent = 'Copy'
        }, 1000)
      }
      codePanel.appendChild(copybtn)

      const { showCode } = store.getState()
      if (showCode) {
        this.splitInstance = window.Split(['#editor', '#code-panel'], {
          sizes: [50, 50],
          direction: 'vertical',
        })
        const pre$ = document.createElement('pre')
        const code$ = document.createElement('code')
        code$.id = 'markup'
        code$.className = 'language-markup'

        code$.textContent = generateCode()
        pre$.appendChild(code$)
        codePanel.appendChild(pre$)
      } else {
        this.splitInstance.destroy()
        codePanel.innerHTML = ''
      }
    })
  }

  render() {
    this.shadowRoot.innerHTML = ''
    const template = document.createElement('template')
    template.innerHTML = `<style>
.container {
font-size: .85em;
padding: 0 1em;
}
</style>
<div class="container">
<label>
<input type="checkbox" /> Code Panel 
</label>
</div> `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('toggle-code-panel', ToggleCodePanel)
