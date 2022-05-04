<script>
 export let open;
 export let heading;
</script>
<details open={open}>
<summary>{heading}</summary>
<slot></slot>
</details>

<style>
summary {
  padding: .5em;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
summary:hover {
background-color: white;
}
</style>
