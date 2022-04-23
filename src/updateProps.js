import { store } from './store';

export default function updateProps(ev, id) {
	const path = ev.path || (ev.composedPath && ev.composedPath());
	const propName = path[0].dataset.property;

	const value = path[0].value;

	store.dispatch({
		type: 'UPDATE_PROPS',
		payload: {
			id,
			name: propName,
			value,
		},
	});
}
