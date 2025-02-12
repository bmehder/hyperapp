import { app, text } from '../hyperapp.js'
import * as html from 'https://esm.run/@hyperapp/html'

const addOne = x => x + 1
const subOne = x => x - 1
const double = x => x * 2
const zero = () => 0

// Actions
const Subtract = state => ({ ...state, count: subOne(state.count) })
const Reset = state => ({ ...state, count: zero() })
const Add = state => ({ ...state, count: addOne(state.count) })
const Double = state => ({ ...state, count: double(state.count) })

// View Components
const counterButton = (str, action) => html.button({ onclick: action }, text(str))

// View
const view = state =>
	html.div([
		html.h1(text(state.count)),
		counterButton('ー', Subtract),
		counterButton('0', Reset),
		counterButton('＋', Add),
		counterButton('x2', Double),
	])

// Export API
export default ({ value, node }) => app({ init: { count: value ?? 0 }, view, node })
