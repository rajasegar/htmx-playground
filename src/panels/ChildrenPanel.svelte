<script>
 import { editor } from '../stores.js';
 import Accordion from '../lib/Accordion.svelte';

 export let id;
 let children;

 editor.subscribe(value => {
		 children = value.components[value.selectedId].children;
 })
 
</script>
<Accordion heading="Children" open>
<ul id="children">
		{#each children as child}
        <li data-id={child}><span class="icon">&#8597</span>{$editor.components[child].type}</li>
		{/each}
</ul>
</Accordion>
<style>
#children {
margin: 0;
padding: 0;
}
#children li {
list-style: none;
padding: .5em;
border-bottom: 1px solid #ddd;
cursor: move;
}
#children li:hover {
background: lightyellow;
}
li .icon {
padding-right: 0.5em;
}

h3 {
margin: 0.25em;
color: var(--elephant);
}
</style>
