<script>
import Editor from "./lib/Editor.svelte";
import InspectorPanel from "./lib/InspectorPanel.svelte";
import EditorMenu from "./lib/EditorMenu.svelte"; 
 import ClearEditor from "./lib/ClearEditor.svelte"; 
 import ExportToCodeSandbox from "./lib/ExportToCodeSandbox.svelte"; 
 import ToggleBuilderMode from "./lib/ToggleBuilderMode.svelte";
 import ToggleCodePanel from "./lib/ToggleCodePanel.svelte";
 import HtmxTemplates from "./lib/HtmxTemplates.svelte"; 

</script>

<header>
		<h1 class="brand">HTMX <span>Playground</span></h1>
		<div class="menu-wrapper">
				<EditorMenu/>
				<HtmxTemplates/>
				<ToggleBuilderMode/>
				<ToggleCodePanel/>
				<ExportToCodeSandbox/>
				<ClearEditor/>
		</div>
				<div class="github">
						<a href="https://github.com/rajasegar/htmx-playground" target="_blank">Github</a>
				</div>
</header>
<div class="container">
		<Editor/>
    <div class="inspector">
				<InspectorPanel id="root"/>
		</div>
</div>

<style>

 header {
   padding: 0.5em 0;
   display: flex;
   align-items: center;
   justify-content: space-between;
   background: var(--elephant);
   color: var(--smoke);
 }

 .menu-wrapper {
		 display: flex;
		 width: 90%;
		 
 }

 .brand {
   font-size: 1em;
   padding-left: 1em;
   width: 200px;
 }

 .brand span {
   font-weight: normal;
 }

 .container {
   display: grid;
   grid-template-columns: 200px 1fr 300px;
   height: calc(100vh - 32px);
   overflow: hidden;
 }

 .inspector { 
	    flex: 0 0 15rem;
	    }

 a {
		 color: white;
		 text-decoration: none;
 }

 .github {
		 margin-right: 1em;
 }

</style>
