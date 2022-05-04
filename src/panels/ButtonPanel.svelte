<script>
 import Accordion from "../lib/Accordion.svelte";
 import ChildrenPanel from "./ChildrenPanel.svelte";
 import HtmxPanel from "./HtmxPanel.svelte"; 
 import ActionsPanel from "../lib/ActionsPanel.svelte"; 

export let props; 
 export let id;
 
</script>
<ActionsPanel id={id} />
<Accordion heading="HTML Attributes" open>
<label  for="txt-id">ID:</label>
<input  type="text" id="txt-id" data-property="id" value="{props.id || ''}"/>
<label  for="txt-class">Class:</label>
<input  type="text" id="txt-class" data-property="class" value="{props.class || ''}"/>
<label  for="txt-children">Children:</label>
<textarea id="txt-children" data-property="children">
{props.children || 'Click me'}
</textarea>
</Accordion>
<HtmxPanel id={id}/>
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
