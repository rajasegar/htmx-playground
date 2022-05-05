<script>

import { getParameters } from 'codesandbox/lib/api/define';
import { generateEJSCode } from '../generateCode';
import getExpressCode from '../getExpressCode';
 import Icon from '../icons/box-arrow-up-right.svg';

	function getSandboxUrl() {
		const parameters = getParameters({
			files: {
				'src/index.js': {
				    content: getExpressCode(),
				},
				'views/index.ejs': {
					content: generateEJSCode()
				},
				'views/editcontact.ejs': {
					content: `
<form hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
  <div>
    <label>First Name</label>
    <input type="text" name="firstName" value="Joe">
  </div>
  <div class="form-group">
    <label>Last Name</label>
    <input type="text" name="lastName" value="Blow">
  </div>
  <div class="form-group">
    <label>Email Address</label>
    <input type="email" name="email" value="joe@blow.com">
  </div>
  <button class="btn">Submit</button>
  <button class="btn" hx-get="/contact/1">Cancel</button>
</form> 
`,
				},
				'package.json': {
					content: {
						"name": "htmx-express-demo",
						"version": "1.0.0",
						"description": "Get started using HTMX with Express.js.",
						"main": "src/index.js",
						"scripts": {
							"start": "node src/start.js",
							"dev": "nodemon src/start.js",
							"test": "tap --no-coverage  --no-esm"
						},
						dependencies: {
							'express': '^4.17.3',
							'ejs': '^3.1.7'
						},
						"devDependencies": {
							"tap": "^14.10.2",
							"nodemon": "^2.0.1"
						},
					},
				},
			},
		});

		const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
		return url;

	}

 let url;
 function handleSubmit() {
		 	url = getSandboxUrl();
			return true
 }


</script>
<div class="container">
<form method="post" action={url} target="check">
<button id="btn-export" type="submit" title="Export to CodeSandbox" on:click={handleSubmit}>
CodeSandbox <Icon/>
</button>
</form>
</div>
<style>
.container { 
padding: 0 1em;
}
textarea { display: none; }
button {
background: transparent;
color: white;
border: none;
cursor: pointer;
font-size: .85em;
}
</style>
