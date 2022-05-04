<script>
 import { editor } from '../stores.js';
 
import duplicateIcon from '../icons/copy.svg';
import deleteIcon from '../icons/trash.svg';
import copyIcon from '../icons/code.svg';
import resetIcon from '../icons/refresh.svg';

 export let id;

 function handleCopy() {}

 function handleDuplicate() {
		 editor.duplicate();
 }

 function handleResetProps() {
		 
 }

 function handleDelete() {
		 editor.remove();
 }
</script>
<div class="action-buttons-wrapper">
    <button  title="Copy component code" color="secondary" on:click={handleCopy}>
				<img src={copyIcon} alt="Copy Code"/>
		</button>
    <button id="btn-duplicate"  title="Duplicate" color="secondary" on:click={handleDuplicate}>
				<img src={duplicateIcon} alt="Duplicate Component"/>
		</button>
    <button id="btn-reset-props"  title="Reset props" color="secondary" on:click={handleResetProps}>
				<img src={resetIcon} alt="Reset Props"/>
		</button>
    <button id="btn-delete" title="Delete" color="secondary" on:click={handleDelete}>
				<img src={deleteIcon} alt="Delete Component"/>
		</button>
</div>

<style>
 .action-buttons-wrapper {
		 padding: 0.5em;
 }
 button {
     margin: 0 0.5em;
		 cursor: pointer;
		 background: white;
		 border: 1px solid #ccc;
		 border-radius: 4px;
		 padding: 0.25em 0.5em;
 }

</style>
