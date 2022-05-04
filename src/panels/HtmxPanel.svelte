<script>
 import Accordion from "../lib/Accordion.svelte"; 
 export let id;
</script>
<Accordion heading="HTMX Attributes" open>
<label  for="txt-hx-get">hx-get</label>
<input  type="text" id="txt-hx-get" data-property="hx-get" value=""/>
<label  for="txt-hx-target">hx-target</label>
<input  type="text" id="txt-hx-target" data-property="hx-target" value=""/>
<label  for="txt-hx-indicator">hx-indicator</label>
<input  type="text" id="txt-hx-indicator" data-property="hx-indicator" value=""/>
<label  for="txt-hx-swap">hx-swap</label>
<input  type="text" id="txt-hx-swap" data-property="hx-swap" value=""/>
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
</style>
