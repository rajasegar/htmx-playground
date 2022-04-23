import { getParameters } from 'codesandbox/lib/api/define';

const template = document.createElement('template');
const parameters = getParameters({
  files: {
    'src/index.js': {
      content: `
const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})
app.listen(port, () => {
  console.log(\`Example app listening on port \${port}\`)
})
`,
    },
      'views/index.pug': {
	  content: `
html
  head
    title= title
  body
    h1= message
`
      },
		'package.json': {
			content: {
				"name": "express-starter",
				"version": "1.0.0",
				"description": "Get started using Express.js with this basic template.",
				"main": "src/index.js",
				"scripts": {
					"start": "node src/start.js",
					"dev": "nodemon src/start.js",
					"test": "tap --no-coverage  --no-esm"
				},
				dependencies: {
					'express': '^4.17.3',
					'pug': '^3.0.2'
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
	
template.innerHTML = `
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
<div class="container">
<form method="post" action="${url}" target="check">
<button id="btn-export" type="submit" title="Export to CodeSandbox">
CodeSandbox <fw-icon name="open-new-tab"></fw-icon>
</button>
</form>
</div>
`;

class ExportToCodeSandbox extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('export-to-codesandbox', ExportToCodeSandbox);
