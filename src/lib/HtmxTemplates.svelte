<script>
		import Dropdown from "./Dropdown.svelte";
 import { editor } from '../stores.js';

 const htmxTemplates = [
		 {
				 name: 'Click To Edit',
				 id: 1,
				 path: '/templates/click-to-edit.json'
		 },
		 {
				 name: 'Bulk Update',
				 id: 2,
				 path: '/templates/bulk-update.json'
		 },
		 {
				 name: 'Click To Load',
				 id: 3,
				 path: '/templates/click-to-load.json'
		 },
		 {
				 name: 'Delete Row',
				 id: 4,
				 path: '/templates/delete-row.json'
		 },
		 {
				 name: 'Edit Row',
				 id: 5,
				 path: '/templates/edit-row.json'
		 },
		 {
				 name: 'Lazy Loading',
				 id: 6,
				 path: '/templates/lazy-loading.json'
		 },
		 {
				 name: 'Inline Validation',
				 id: 7,
				 path: '/templates/inline-validation.json'
		 },
		 {
				 name: 'Infinite Scroll',
				 id: 8,
				 path: '/templates/infinite-scroll.json'
		 },
		 {
				 name: 'Active Search',
				 id: 9,
				 path: '/templates/active-search.json'
		 },
		 {
				 name: 'Progress Bar',
				 id: 10,
				 path: '/templates/progress-bar.json'
		 },
 ]

 async function loadTemplate(path) {
		 const templateUrl = new URL(path, import.meta.url).href;
		 const template = await fetch(templateUrl).then(response => response.json());
		 editor.importFromJson(template);
 }
</script>

<Dropdown trigger="HTMX Templates">
		{#each htmxTemplates as temp}
    <a role="button" on:click={() => loadTemplate(temp.path)}>{temp.name}</a>
		{/each}
</Dropdown>

<style>
a {
  color: var(--elephant);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
font-size: .75em;
}
a:hover {
background-color: var(--smoke);
color: var(--sidebar-bg);
}
</style>
