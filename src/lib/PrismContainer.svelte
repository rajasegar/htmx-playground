<script>
 import Prism from 'prismjs';
 import { editor } from '../stores.js';

 import generateCode from '../generateCode';

 let codePromise;

 editor.subscribe(() => {
		codePromise = generateCode();
 });

 let language = 'html';

 let label = "Copy Code";

 function copyCode(code) {
		 navigator.clipboard.writeText(code); 

		 label  = 'Copied!'
     setTimeout(() => {
         label = 'Copy Code'
     }, 1000)
 }
</script>


{#await codePromise}
		<p>Loading...</p>
{:then code} 
		<div class="copy-btn-container">
				<button type="button" on:click={() => copyCode(code)}>{label}</button>
		</div>
		<div class="code">
				{@html Prism.highlight(code, Prism.languages[language])}
		</div>
{/await}

<svelte:head>
		<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css" rel="stylesheet" />
</svelte:head>

<style>
 .code {
     white-space: pre-wrap;
		 padding: 1em;
 }

 .copy-btn-container {
		 position: absolute;
		 top: 20px;
		 right: 20px;
 }

 button {
		 padding: 0.5em 1em;
		 color: white;
		 background: var(--elephant);
		 border: none;
		 border-radius: 4px;
 }
</style>
