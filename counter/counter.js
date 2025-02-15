import { app, html, onClick, text } from '../hyperapp.js'

const Helpers = {
	addOne: x => x + 1,
	subOne: x => x - 1,
	double: x => x * 2,
	zero: () => 0,
}
// Actions
const Actions = {
	Subtract: state => ({ ...state, count: Helpers.subOne(state.count) }),
	Reset: state => ({ ...state, count: Helpers.zero() }),
	Add: state => ({ ...state, count: Helpers.addOne(state.count) }),
	Double: state => ({ ...state, count: Helpers.double(state.count) }),
}

const Views = {
	counterButton: (str, action) => html.button(onClick(action), text(str)),
	default: state =>
		html.div([
			html.h1(text(state.count)),
			Views.counterButton('ー', Actions.Subtract),
			Views.counterButton('0', Actions.Reset),
			Views.counterButton('＋', Actions.Add),
			Views.counterButton('x2', Actions.Double),
		]),
}

// Export API
export default ({ value, node }) =>
	app({ init: { count: value ?? 0 }, view: Views.default, node })
