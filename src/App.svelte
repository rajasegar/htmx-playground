<script>
import Editor from "./lib/Editor.svelte";
import InspectorPanel from "./lib/InspectorPanel.svelte";
import EditorMenu from "./lib/EditorMenu.svelte"; 
 import ClearEditor from "./lib/ClearEditor.svelte"; 
 import ExportToCodeSandbox from "./lib/ExportToCodeSandbox.svelte"; 
 import ToggleBuilderMode from "./lib/ToggleBuilderMode.svelte";
 import ToggleCodePanel from "./lib/ToggleCodePanel.svelte";

</script>
<header>
  <h1 class="brand">HTMX <span>Playground</span></h1>
  <div class="menu-wrapper">
			<EditorMenu/>
			<ToggleBuilderMode/>
			<ToggleCodePanel/>
		<ExportToCodeSandbox/>
		<ClearEditor/>
    <download-project></download-project>
  </div>
</header>
<div class="container">
  <Editor/>
    <div class="inspector">
    <InspectorPanel id="root"/>
  </div>
</div>

<style>
 :root {
   --elephant: #183247;
   --smoke: #f3f5f7;
   --milk: #fff;
   --smoke10: #f7f9fa;
   --smoke700: #475867;
   --smoke600: #576c7d;
   --jungle: #00a886;
   --azure: #2c5cc5;
   --persimmon: #e43538;
   --casablanca: #e86f25;
   --sidebar-bg: #264966;
 }

 :global(*) {
   margin: 0;
   padding: 0;
   line-height: 1;
 }

 :global(body) {
   font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
 }

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

</style>
