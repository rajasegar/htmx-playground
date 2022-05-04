const defaultProps = {
	div: {},
	button: { children: "Hello" },
	form: {},
	label: {
		children: 'MyLabel:'
	},
	input: {},
	select: {
		options: [
			{ value: 'Audi', label: 'Audi' },
			{ value: 'Ferrari', label: 'Ferrari' },
			{ value: 'BMW', label: 'BMW' },
		],
		'hx-get': '',
		'hx-target': '',
		'hx-indicator': '',
	},
		span: {
				children: 'My span'
		}
};

export default defaultProps;

