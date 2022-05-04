<script>
 import { editor } from '../stores.js';
 import Accordion from "../lib/Accordion.svelte"; 

 export let id;
 export let props;

 const htmxProps = [
		 'hx-boost',
		 'hx-confirm',
		 'hx-delete',
		 'hx-disable',
		 'hx-disinherit',
		 'hx-encoding',
		 'hx-ext',
		 'hx-get',
		 'hx-headers',
		 'hx-history-elt',
		 'hx-include',
		 'hx-indicator',
		 'hx-params',
		 'hx-patch',
		 'hx-post',
		 'hx-preserve',
		 'hx-prompt',
		 'hx-push-url',
		 'hx-put',
		 'hx-request',
		 'hx-select',
		 'hx-sse',
		 'hx-swap',
		 'hx-swap-oob',
		 'hx-sync',
		 'hx-target',
		 'hx-trigger',
		 'hx-vals',
		 'hx-vars',
		 'hx-ws',
 ];

 
 function updateHtmxProps(name, value) {
		 editor.updateProps({
				 [name]: value
		 });
		 
 }
</script>
<Accordion heading="HTMX Attributes" open>
		<div class="props-container">
		{#each htmxProps as prop}
				<label>{prop}</label>
				<input type="text" value={props[prop] || ''} on:input={(e) => updateHtmxProps(prop, e.target.value) } />
		{/each}
		</div>
</Accordion>
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

 .props-container {
		 overflow-y: auto;
		 max-height: 400px;
 }
</style>
