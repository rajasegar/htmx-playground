<script>
 import { editor } from '../stores.js';

 function clearEditor() {
		 editor.reset();
 }
</script>

<div>
		<button on:click={clearEditor}>&times; Clear Editor</button>
</div>

<style>
 button {
		 background: transparent;
		 padding: 0 0.5em;
		 border: none;
		 color: var(--smoke);
		 cursor: pointer;
 }
</style>
