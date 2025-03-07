import {
	app,
	html,
	text,
	withTargetValue,
	onClick,
	onInput,
	not,
	isNullish,
} from '../hyperapp.js'

const Helpers = {
	isNotNullish: not(isNullish),
}

const Actions = {
	init: () => ({
		first: 10,
		last: 5,
		result: null,
	}),
	UpdateFirst: (state, value) => ({ ...state, first: +value }),
	UpdateLast: (state, value) => ({ ...state, last: +value }),
	Add: state => ({ ...state, result: state.first + state.last }),
	Subtract: state => ({ ...state, result: state.first - state.last }),
	Multiply: state => ({ ...state, result: state.first * state.last }),
	Divide: state => ({ ...state, result: state.first / state.last }),
	Reset: _ => ({
		first: 0,
		last: 0,
		result: null,
	}),
}

const Views = {
	numberInput: (value, action) =>
		html.input({
			type: 'number',
			value,
			...onInput(action),
		}),
	calcButton: (str, action) => html.button(onClick(action), text(str)),
	result: ({ result }) => Helpers.isNotNullish(result) && html.p(text(result)),
	default: state =>
		html.div([
			Views.numberInput(state.first, withTargetValue(Actions.UpdateFirst)),
			Views.numberInput(state.last, withTargetValue(Actions.UpdateLast)),
			Views.calcButton('Add', Actions.Add),
			Views.calcButton('Subtract', Actions.Subtract),
			Views.calcButton('Multiply', Actions.Multiply),
			Views.calcButton('Divide', Actions.Divide),
			Views.calcButton('Reset', Actions.Reset),
			Views.result(state),
		]),
}

export default ({ node }) => app({ init: Actions.init, view: Views.default, node })
