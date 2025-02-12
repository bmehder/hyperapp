import { text } from 'https://esm.run/hyperapp'
import * as html from 'https://esm.run/@hyperapp/html'
import { editable } from './lib/views.js'
import { withFocus } from './lib/decorators.js'

export default props =>
	editable(
		{
			id: 'todo-input',
			editing: props.editing,
			value: props.value,
			oninput: props.oninput,
			onblur: props.ondone,
			ondone: props.ondone,
		},
		[
			html.input({
				type: 'checkbox',
				checked: props.checked,
				oninput: props.ontoggle,
			}),
			html.span(
				{
					onclick: withFocus(props.onedit, '#todo-input'),
					class: { done: props.checked },
				},
				text(props.value)
			),
			html.button({ onclick: props.ondelete }, text('X')),
		]
	)
