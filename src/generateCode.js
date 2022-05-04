import { editor } from './stores.js';

let components;

editor.subscribe(value => {
	components = value.components;
});

export default function generateCode() {
	const code = generateCodeForChildren(components.root.children);
	return code;
}

export function generateEJSCode() {
	const body = generateCode();

	const code = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>My HTMX Playground app</title>
</head>
<body>
${body}
<script src="https://unpkg.com/htmx.org@1.7.0"></script>
</body>
</html>
`;

	return code;
}

function generateCodeForChildren(offspring) {
	let code = ''
	offspring.forEach((id) => {
		const { type, props, children } = components[id]

		switch (type) {
			case 'fw-button':
				code += generateButtonCode(props)
				break

			default:
				code += generateDefaultCode(type, props, children)
		}
	})
	return code
}

function generateDefaultCode(type, props, children) {
	let code = ''

	const properties = Object.keys(props)
		.filter((p) => !['children', 'options'].includes(p))
		.map((p) => `${p}="${props[p]}"`)
		.join('\n')

	if (props.children) {
		code += `<${type} ${properties}>${props.children}</${type}>\n`
	} else if (children.length > 0) {
		const _children = generateCodeForChildren(children)
		code += `<${type} ${properties}>\r\n${_children}</${type}>\n`
	} else if (props.options) {
		const _children = generateChildrenFromOptions(type, props.options)
		code += `<${type} ${properties}>\r\n${_children}</${type}>\n`
	} else {
		code += `<${type} ${properties}></${type}>\n`
	}

	return code
}

function generateButtonCode(props) {
	let code = ''

	const properties = Object.keys(props)
		.filter((p) => !['children', 'icon'].includes(p))
		.map((p) => `${p}="${props[p]}"`)
		.join(' \r\n')

	if (props.size && props.size === 'icon') {
		code += `<fw-button ${properties}><fw-icon name="${props.icon}"></fw-icon></fw-button>`
	} else {
		code += `<fw-button ${properties}>${props.children}</fw-button>\n`
	}

	return code
}

function generateChildrenFromOptions(type, options) {
	let opts = ''
	switch (type) {
		case 'fw-select':
			opts = generateOptionsForSelect(options)
			break

		case 'fw-dropdown-button':
			opts = generateOptionsForDropdownButton(options)
			break

		default:
			console.error('Unknown component with options props')
	}
	return opts
}

function generateOptionsForDropdownButton(options) {
	const opts = options
		.map((option) => {
			return `  <option id="${option.id}" value="${option.value}">${option.label}</option>`
		})
		.join('\n')

	const wrapper = `<div slot="dropdown-options">${opts}</div>`
	return wrapper
}

function generateOptionsForSelect(options) {
	return options
		.map((option) => {
			return `  <fw-select-option value="${option.value}">${option.label}</fw-select-option>`
		})
		.join('\n')
}
