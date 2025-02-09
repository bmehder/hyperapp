import { app, tag, text, onInput, onClick } from './hyper-utils.js'
import { compose, isNullish, not } from 'https://esm.run/nejquery'

// Composed HTML functions
const [div, button, p, input] = ['div', 'button', 'p', 'input'].map(tag)

// Utility function
const isNotNullish = not(isNullish)

// State
const init = () => ({
	first: 10,
	last: 5,
	result: null,
})

// Actions
const Add = state => ({ ...state, result: state.first + state.last })
const Subtract = state => ({ ...state, result: state.first - state.last })
const Multiply = state => ({ ...state, result: state.first * state.last })
const Divide = state => ({ ...state, result: state.first / state.last })

const UpdateFirst = (state, event) => ({ ...state, first: +event.target.value })
const UpdateLast = (state, event) => ({ ...state, last: +event.target.value })

// View Components
const calcButton = (str, action) => button(onClick(action), text(str))

const numberInput = (value, action) =>
	input({
		type: 'number',
		value,
		...onInput(action),
	})

const result = ({ result }) => isNotNullish(result) && compose(p, text)(result)

// View
const view = state =>
	div([
		numberInput(state.first, UpdateFirst),
		numberInput(state.last, UpdateLast),
		calcButton('Add', Add),
		calcButton('Subtract', Subtract),
		calcButton('Multiply', Multiply),
		calcButton('Divide', Divide),
		result(state),
	])

// Export function to create an instance of the app
export default ({ node }) => app({ init, view, node })
