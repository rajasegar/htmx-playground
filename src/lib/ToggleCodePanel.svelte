<script>
 import { editor } from '../stores.js';

 let showCode = false;
 let splitInstance;

 editor.subscribe(value => {
		 showCode = value.showCode;
 });

 function handleCheckbox() {
		 editor.toggleCode();
		 if (showCode) {
         splitInstance = window.Split(['#drop_zone', '#code-panel'], {
						 sizes: [50, 50],
						 direction: 'vertical',
         })

     } else {
         splitInstance.destroy()
     }
 }
</script>
<div class="container">
<label>
<input type="checkbox" bind:checked={showCode} on:click={handleCheckbox}/> Code Panel 
</label>
</div> 
<style>
.container {
font-size: .85em;
padding: 0 1em;
}
</style>
