import { app, tag, text } from '../hyperapp.js'
import { compose } from 'https://esm.run/nejquery'

const [input, h1, div] = ['input', 'h1', 'main'].map(tag)

// State
const init = { message: '' }

// Action
const SetText = (state, event) => ({ ...state, message: event.target.value })

// View component
const textInput = value =>
	input({
		type: 'text',
		value,
		oninput: SetText,
		placeholder: 'Type in something...',
		autofocus: true,
	})

// View
const view = ({ message }) => div([textInput(message), compose(h1, text)(message)])

// Export App
export default ({ node }) => app({ init, view, node })
