<script>

import { loadFromJSON } from '../utils/import'
 import { editor } from '../stores.js';
 import Icon from '../icons/caret-down.svg';

 function handleExport() {
      editor.exportJson()
 }

 async function handleImport() {
     const _components = await loadFromJSON()
		 editor.importFromJson(_components);
 }
</script>
<div class="dropdown">
  <button class="dropbtn">Editor <Icon /></button>
  <div class="dropdown-content">
    <a role="button" id="btnExport" on:click={handleExport}>Export components</a>
    <a role="button" id="btnImport" on:click={handleImport}>Import components</a>
    <a href="https://htmx.org" target="_blank">HTMX Docs</a>
  </div>
</div> 
 <style>
.dropbtn {
  background: transparent;
  color: white;
  padding: 0 1em;
  font-size: .95em;
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

	.dropbtn svg {
			vertical-align: text-bottom;
	}
</style>
