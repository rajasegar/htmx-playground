<script>
 import { editor } from '../stores.js';
 
import DuplicateIcon from '../icons/copy.svg';
import DeleteIcon from '../icons/trash.svg';
import CopyIcon from '../icons/code.svg';
import ResetIcon from '../icons/refresh.svg';

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
				<CopyIcon />
		</button>
    <button id="btn-duplicate"  title="Duplicate" color="secondary" on:click={handleDuplicate}>
				<DuplicateIcon/>
		</button>
    <button id="btn-reset-props"  title="Reset props" color="secondary" on:click={handleResetProps}>
				<ResetIcon/>
		</button>
    <button id="btn-delete" title="Delete" color="secondary" on:click={handleDelete}>
				<DeleteIcon/>
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
