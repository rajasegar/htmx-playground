<script>
 import updateProps from "../updateProps"; 

 export let id;
 export let props;

 const attrs = [
		 {
				 name: 'alt'
		 },
		 {
				 name: 'src'
		 },
 ];

 function handleInput(prop, value) {
		 updateProps({
				 [prop]: value
		 });
 }

</script>

{#each attrs as attr}
		<label  for="txt-{attr.name}">{attr.name}:</label>
		<input  type="text" id="txt-{attr.name}"  value={props[attr.name] || ''} on:input={(ev) => handleInput(attr.name, ev.target.value)} />
{/each}

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
