import * as html from 'https://esm.run/@hyperapp/html'
import { withTargetValue, withEnterKey } from './decorators.js'

const textInput = props =>
	html.input({
		...props,
		type: 'text',
		value: props.value,
		oninput: withTargetValue(props.oninput),
		onkeydown: withEnterKey(props.ondone),
	})

const editable = ({ editing, ...inputProps }, content) =>
	editing ? textInput(inputProps) : content

const list = ({ items, render }) =>
	html.ul(items.map((value, index) => html.li(render(value, index))))

export { textInput, editable, list }
