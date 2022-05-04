<script>
 import { editor } from '../stores.js';
 import DivPanel from '../panels/DivPanel.svelte';
 import ButtonPanel from '../panels/ButtonPanel.svelte';
 import RootPanel from '../panels/RootPanel.svelte';
 import LabelPanel from '../panels/LabelPanel.svelte';
 import SpanPanel from '../panels/SpanPanel.svelte';

 export let id;

 let name;
 let panel;
 let props;

 editor.subscribe(value => {
		 name = value.components[value.selectedId].type
		 props = value.components[value.selectedId].props;
		 
		 switch(name) {
				 case 'div':
						 panel = DivPanel;
						 break;

				 case 'button':
						 panel = ButtonPanel;
						 break;

				 case 'label':
						 panel = LabelPanel;
						 break;

				 case 'span':
						 panel = SpanPanel;
						 break;

				 default:
						 panel = RootPanel;
		 }
 })

</script>
<div class="inspector" id="inspector">
<h3>{$editor.components[$editor.selectedId].type}</h3>
<svelte:component this={panel} props={props} id={id} />
</div>

<style>

.action-buttons-wrapper {
		padding: 0.5em;
}
.inspector {
		background-color: var(--smoke);
		border-left: 1px solid var(--elephant);
		height: 100%;
}
button {
		margin: 0 0.5em;
		cursor: pointer;
		background: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0.25em 0.5em;
}
h3 {
		padding: 0.25em 0.5em;
		margin: 0;
		background: #fefcbf;
		color: #5f370e;
}
</style>
