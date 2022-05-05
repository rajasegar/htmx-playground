<script>
 import Icon from '../icons/caret-down.svg';
 export let trigger;
</script>
<div class="dropdown">
		<button class="dropbtn">
				{trigger} <Icon />
		</button>
  <div class="dropdown-content">
			<slot></slot>
  </div>
</div> 
 <style>
.dropbtn {
  background: transparent;
  color: white;
  padding: 0 1em;
  font-size: .95em;
  border: none;
  cursor: pointer;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-content a {
  color: var(--elephant);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
font-size: .75em;
}
.dropdown-content a:hover {
background-color: var(--smoke);
color: var(--sidebar-bg);
}
.dropdown:hover .dropdown-content {
  display: block;
}

</style>
