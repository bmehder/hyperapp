import { app, tag, text, onClick } from './hyper-utils.js'

// Create HTML functions
const [div, h1, button] = ['div', 'h1', 'button'].map(tag)

// State
const init = (count = 0) => ({ count })

// Actions
const Subtract = state => ({ ...state, count: state.count - 1 })
const Reset = state => ({ ...state, count: 0 })
const Add = state => ({ ...state, count: state.count + 1 })
const Double = state => ({ ...state, count: state.count * 2 })

// View Components
const counterButton = (str, action) => button(onClick(action), text(str))

// View
const view = state =>
	div([
		h1(text(state.count)),
		counterButton('ー', Subtract),
		counterButton('0', Reset),
		counterButton('＋', Add),
		counterButton('x2', Double),
	])

// Export API
export default ({ value, node }) => app({ init: init(value), view, node })
