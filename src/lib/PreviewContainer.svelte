<script>
 import { element } from 'svelte/internal';
import { editor } from '../stores.js';

 export let component;
 let active;

 editor.subscribe(value => {
		 /* component = value.components[id]; */
		 active = component.id === value.selectedId;
 })

 function selectComponent(ev) {
		 ev.stopPropagation();
		 editor.select(component.id)
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
		 payload.parentName = component.id
		 payload.rootParentType = component.name
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
		<div class="annotation">{component.type}</div>

		{#if component.children.length > 0}
				<svelte:element this={component.type} {...component.props}>
				{#each component.children as child}
						{@const childComponent = $editor.components[child]}
								<svelte:self component={childComponent}  />
				{/each}
				</svelte:element>
		{:else}
				{#if component.props.children}
				<svelte:element this={component.type} {...component.props}>
						{component.props.children}
				</svelte:element>
				{:else}
				<svelte:element this={component.type} {...component.props} />
				{/if}
		{/if}

</div>

<style>
 .preview-wrapper {
		 margin: 0.25em;
		 padding: 1em;
		 border: 1px dashed black;
		 min-height: 1em;
		 position: relative;
 }

 .preview-wrapper:hover {
		 border: 1px solid blue;
 }
 .active, .active:hover {
		 border: 2px solid var(--elephant);
 }

 .annotation {
		 position: absolute;
		 color: var(--elephant);
		 padding: 0.25em 0.5em;
		 font-size: .7em;
		 right: 0;
		 top:0;
		 border-bottom-left-radius: 4px;
		 border: 1px dashed var(--elephant);
		 border-top: none;
		 border-right: none;
		 
 }

 .active .annotation {
		 
		 background: var(--elephant);
		 color: white;
 }
</style>
