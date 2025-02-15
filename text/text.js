import { app, html, text, onInput, focus, withTargetValue } from '../hyperapp.js'

const Actions = {
	init: () => [
		{
			message: '',
		},
		focus('text-input'),
	],
	SetText: (state, value) => ({ ...state, message: value }),
}

const Views = {
	textInput: value =>
		html.input({
			id: 'text-input',
			type: 'text',
			value,
			...onInput(withTargetValue(Actions.SetText)),
			placeholder: 'Type something...',
		}),

	default: ({ message }) =>
		html.div([Views.textInput(message), html.h1(text(message))]),
}

export default ({ node }) => app({ init: Actions.init, view: Views.default, node })
