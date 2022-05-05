<script>
 import { editor } from '../stores.js';
 import ButtonPanel from '../panels/ButtonPanel.svelte';
 import RootPanel from '../panels/RootPanel.svelte';
 import AnchorPanel from '../panels/AnchorPanel.svelte';
 import DefaultPanel from '../panels/DefaultPanel.svelte';
 import InputPanel from '../panels/InputPanel.svelte';
 import ImgPanel from '../panels/ImgPanel.svelte';
 import OptionPanel from '../panels/OptionPanel.svelte';


 export let id;

 let component = $editor.components[$editor.selectedId];
 let { type: name, props } = component;
 let mainpanel; // Main panel which houses the respective element panels
 let panel; // Respective element panels



 editor.subscribe(value => {
		 name = value.components[value.selectedId].type
		 props = value.components[value.selectedId].props;

		 switch(name) {
				 case 'root':
						 mainpanel = RootPanel;
						 break;

				 default:
						 mainpanel = DefaultPanel;
						 
		 }
		 
		 switch(name) {

				 case 'button':
						 panel = ButtonPanel;
						 break;

				 case 'a':
						 panel = AnchorPanel;
						 break;

				 case 'input':
						 panel = InputPanel;
						 break;

				 case 'img':
						 panel = ImgPanel;
						 break;
						 
				 case 'option':
						 panel = OptionPanel;
						 break;

				 default:
						 panel = undefined;
		 }
 })

</script>
<div id="inspector">
		<h3>{$editor.components[$editor.selectedId].type}</h3>
		
<svelte:component this={mainpanel} props={props} id={id} >
		<svelte:component this={panel} props={props} id={id}/>
</svelte:component>
</div>

<style>

.action-buttons-wrapper {
		padding: 0.5em;
}
#inspector {
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
