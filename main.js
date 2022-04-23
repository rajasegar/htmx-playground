import './style.css'

import handleDrop from './src/handleDrop'
import './src/components/toggle-builder-mode'
import './src/components/toggle-show-code'
import './src/components/inspector-panel'
import './src/components/clear-editor'
import './src/components/editor-menu'
import './src/components/download-project'
import './src/components/export-to-codesandbox';
import './src/components/sidebar';

;(function () {
  const editor = document.getElementById('editor')

  editor.addEventListener('dragover', (ev) => {
    ev.preventDefault()
  })

  editor.addEventListener('drop', handleDrop)

  document.addEventListener('dragstart', (ev) => {
    if (ev.target.classList.contains('drag-item')) {
      ev.dataTransfer.setData('id', ev.target.id)
    }
  })
})()
