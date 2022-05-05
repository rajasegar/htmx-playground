<script>
 import HtmxPanel from "./HtmxPanel.svelte";
 import ChildrenPanel from "./ChildrenPanel.svelte"; 
 import Accordion from "../lib/Accordion.svelte"; 
 import ActionsPanel from "../lib/ActionsPanel.svelte"; 
 import updateProps from "../updateProps"; 

 export let id;
 export let props;

 function handleInput(prop, value) {
		 updateProps({
				 [prop]: value
		 });
 }

</script>

<ActionsPanel id={id} />
<Accordion heading="HTML Attributes" open>
<label for="txt-id">ID:</label>
<input type="text" id="txt-id" value={props.id || ''} on:input={(ev) => handleInput('id', ev.target.value)} />
<label for="txt-class">Class:</label>
<input type="text" id="txt-class" value={props.class || ''} on:input={(ev) => handleInput('class', ev.target.value)} />
<label for="txt-children">Children:</label>
<textarea id="txt-children" value={props.children || ''} on:input={(ev) => handleInput('children', ev.target.value)} />
<slot></slot>
</Accordion>
<HtmxPanel id={id} props={props} />
<ChildrenPanel id={id}/>

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
</style>
