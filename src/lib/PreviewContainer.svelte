<script>
 import { editor } from '../stores.js';

 export let id;
 export let name;

 let component;
 let active = false;

 const unsubscribe = editor.subscribe(value => {
		 component = value.components[id];
		 active = id === value.selectedId;
 });
 
 function selectComponent(ev) {
		 ev.stopPropagation();
		 editor.select(id)
 }

 function handleDragEnter(e) {
		 e.target.style.background = 'cyan';
 }

 function handleDragLeave(e) {
		 e.target.style.background = 'transparent';
 }

 function handleDragDrop(e) {
     e.preventDefault();
		 e.stopPropagation();
		 e.target.style.background = 'transparent';
     var element_id = e
         .dataTransfer
         .getData("text");

		 const payload = {}
		 payload.type = element_id
		 payload.parentName = id
		 payload.rootParentType = name
		 editor.add(payload);
 }

 function handleMouseEnter(ev) {
		 /* ev.stopPropagation();
				ev.stopImmediatePropagation();
				if(!active) {
				ev.target.style.border = '1px solid var(--elephant)';
				} */
 }

 function handleMouseLeave(ev) {
		 /* ev.stopPropagation();
				ev.stopImmediatePropagation();
				if(!active) {
				ev.target.style.border = '1px dashed black';
				} */
 }

</script>

<div
		class="preview-wrapper {active ? ' active' : ''}"
		on:click={selectComponent}
					 on:dragenter={handleDragEnter} 
		on:dragleave={handleDragLeave}  
		on:drop={handleDragDrop} 
		ondragover="return false"
		on:mouseenter={handleMouseEnter}
					 on:mouseleave={handleMouseLeave}

>

		{#if component.children.length > 0}
				{#each component.children as child}
						{@const childComponent = $editor.components[child]}
						<svelte:self id={child} name={childComponent.type}/>
				{/each}
		{:else}
				<svelte:element this={component.type}></svelte:element>
		{/if}

</div>

<style>
 .preview-wrapper {
		 margin: 0.25em;
		 padding: 1em;
		 border: 1px dashed black;
		 min-height: 1em;
 }

 .preview-wrapper:hover {
		 border: 1px solid var(--elephant);
 }
 .active, .active:hover {
		 border: 2px solid var(--elephant);
 }
</style>
