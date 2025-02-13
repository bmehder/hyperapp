import { html, app, text, withEnterKey, withTargetValue } from '../hyperapp.js'

// Initial State
const init = {
	todos: [],
	dones: [],
	newTodo: null,
}

// Actions
const AddTodo = state => ({
	...state,
	todos: [state.newTodo, ...state.todos],
	dones: [false, ...state.dones],
	newTodo: null,
})

const UpdateNewTodo = (state, value) => ({ ...state, newTodo: value })

const DeleteTodo = (state, index) => ({
	...state,
	todos: state.todos.toSpliced(index, 1),
	dones: state.dones.toSpliced(index, 1),
})

const UpdateTodo = (state, index) => {
	const todos = [...state.todos]
	const dones = [...state.dones]
	dones[index] = !dones[index]

	return {
		...state,
		todos,
		dones,
	}
}

// View Components
const list = state =>
	html.ul(
		state.todos.map((todo, index) =>
			html.li([
				html.input({
					type: 'checkbox',
					checked: state.dones[index],
					oninput: [UpdateTodo, index],
				}),
				text(todo),
				html.button({ onclick: [DeleteTodo, index] }, text('X')),
			])
		)
	)

const textInput = state =>
	html.div([
		html.input({
			value: state.newTodo,
			oninput: withTargetValue(UpdateNewTodo),
			onkeydown: withEnterKey(AddTodo),
			placeholder: 'Add new todo...',
		}),
		html.button({ onclick: AddTodo }, text('+')),
	])

// View
const view = state => html.div([textInput(state), list(state)])

// Export function to create app instance
export default ({ node }) => app({ init, view, node })
