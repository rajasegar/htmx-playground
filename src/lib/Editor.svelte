<script>

import { editor } from '../stores.js';
import PreviewContainer from './PreviewContainer.svelte';
 import PrismContainer from './PrismContainer.svelte';

 let showCode = false;

 editor.subscribe(value => {
		 showCode = value.showCode;
 });

 
 const htmlTags = [
		 'div','p','span','a','button','img','form','label',
		 'input','textarea','select','option','fieldset','header',
		 'footer','nav','article','aside','main','section',
		 'ol','li','ul', 'table','tbody','thead','th','tr','td',
		 'h1','h2','h3','h4','h5','h6',
 ]

 let drop_zone;
 
 let activeEvent = '';
 let originalX = '';
 let originalY = '';
 
function handleDragEnter(e) {}

    function handleDragLeave(e) {}

    function handleDragDrop(e) {
        e.preventDefault();
				e.stopPropagation();
        var element_id = e
            .dataTransfer
            .getData("text");

				const payload = {
						type: element_id,
						parentName: 'root',
						rootParentType: 'root',
				};
				
				editor.add(payload);
    }

 function handleDragStart(e) {
     e.dataTransfer.dropEffect = "move";
     e.dataTransfer
      .setData("text", e.target.getAttribute('id'));
 }

 function handleDragEnd(e) {
 }

 function handleTouchStart(e) {
     originalX = (e.target.offsetLeft - 10) + "px";
     originalY = (e.target.offsetTop - 10) + "px";
     activeEvent = 'start';
 }

 function handleTouchMove(e) {
     let touchLocation = e.targetTouches[0];
     let pageX = Math.floor((touchLocation.pageX - 50)) + "px";
     let pageY = Math.floor((touchLocation.pageY - 50)) + "px";
     e.target.style.position = "absolute";
     e.target.style.left = pageX;
     e.target.style.top = pageY;
     activeEvent = 'move';
 }

 function handleTouchEnd(e) {
     e.preventDefault();
     if (activeEvent === 'move') {
      	 let pageX = (parseInt(e.target.style.left) - 50);
      	 let pageY = (parseInt(e.target.style.top) - 50);

      	 if (detectTouchEnd(drop_zone.offsetLeft, drop_zone.offsetTop, pageX, pageY, drop_zone.offsetWidth, drop_zone.offsetHeight)) {
        		 dropped = dropped.concat(e.target.id);
        		 e.target.style.position = "initial";
        		 dropped_in = true;
        		 status = "You dropped " + e
          			 .target
          			 .getAttribute('id') + " into drop zone";
         } else {
        		 e.target.style.left = originalX;
        		 e.target.style.top = originalY;
        		 status = "You let the " + e
          			 .target
          			 .getAttribute('id') + " go.";
         }
     }
 }

 function detectTouchEnd(x1, y1, x2, y2, w, h) {
     //Very simple detection here
     if (x2 - x1 > w) 
      	 return false;
     if (y2 - y1 > h) 
      	 return false;
     return true;
 } 

 function selectRoot(ev) {
		 ev.stopPropagation();
		 editor.select('root');
 }

</script>
<div class="sidebar">
    <ul>
      {#each htmlTags as tag}
					<li
							class="drag-item"
							id={tag}
										 draggable="true"
										 on:dragstart={handleDragStart}
										 on:dragend={handleDragEnd}
										 on:touchstart={handleTouchStart}
										 on:touchmove={handleTouchMove}
										 on:touchend={handleTouchEnd}
					>{tag}</li>
      {/each}
    </ul>
  </div>
  <div id="editor-wrapper">
			<div class="builder-mode"
					 on:dragenter={handleDragEnter} 
					 on:dragleave={handleDragLeave}  
					 on:drop={handleDragDrop} 
					 bind:this={drop_zone} 
					 id="drop_zone" 
					 ondragover="return false"
					 on:click={selectRoot}

			>
					{#each $editor.components['root'].children as comp}
							{@const component = $editor.components[comp]}
							<PreviewContainer id={component.id} name={component.type} props={component.props} />
							{/each}
			</div>
					<div id="code-panel">
			{#if showCode}
					<PrismContainer />
		{/if}
					</div>
  </div>
  <style>
	 .sidebar {
			 background-color: var(--sidebar-bg);
			 padding: 1em 0.5em;
			 color: white;
			 flex: 0 0 12rem;
	 }

	 #editor-wrapper {
			 display: flex;
			 flex: 1 1 0%;
			 flex-direction: column;
			 overflow: auto;
	 }

	 #drop_zone {
			 height: 100%;
			 background-color: var(--smoke10);
			 padding: 1em;
			 overflow: auto;
	 }

	 .drag-item {
			 cursor: move;
			 padding: 0.25em;
			 margin: 0.25em;
			 list-style: none;
			 border-radius: 4px;
	 }

	 .drag-item:hover {
			 color: var(--elephant);
			 background: var(--smoke);
	 }

	 .drag-item::before {
			 content: '::';
			 padding-right: 0.5em;
	 }

	 .builder-mode {
			 background-image: linear-gradient(to right, rgb(217, 226, 233) 1px, transparent 1px), linear-gradient(rgb(217, 226, 233) 1px, transparent 1px);
			 background-size: 20px 20px;
			 background-color: rgb(237, 242, 246);
	 }


	 pre {
			 padding: 0.25em;
	 }

	 .sidebar ul {
			 overflow: auto;
			 max-height: 90vh;
	 }


  </style>
