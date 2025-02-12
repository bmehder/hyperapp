import { text } from 'https://esm.run/hyperapp'
import * as html from 'https://esm.run/@hyperapp/html'
import { textInput } from './lib/views.js'

export const wire = ({ get, set, onadd }) => {
	const InputNewItem = (state, input) => set(state, input)

	const AddItem = state => {
		let value = get(state)
		if (!value) return state
		state = set(state, null)
		state = onadd(state, value)
		return state
	}

	return {
		model: state => ({
			value: get(state),
			InputNewItem,
			AddItem,
		}),
	}
}

export const view = model => [
	textInput({
		value: model.value,
		placeholder: 'What do you need to do?',
		oninput: model.InputNewItem,
		ondone: model.AddItem,
		onblur: model.AddItem,
	}),
	html.button({ onclick: model.ondone }, text('+')),
]

export const init = () => null
