const defaultProps = {
  div: {},
  button: { children: "Hello" },
  form: {},
  label: {},
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
    }
};

export default defaultProps;

