import {
	html,
	app,
	text,
	withEnterKey,
	withTargetValue,
	focuser,
} from '../hyperapp.js'

// Initial State
const init = [
	{
		todos: [],
		dones: [],
		newTodo: null,
	},
	focuser('.new-todo-input'),
]

// Actions
const SetInputValue = (state, value) => ({ ...state, newTodo: value })

const AddTodo = state => ({
	...state,
	todos: [state.newTodo, ...state.todos],
	dones: [false, ...state.dones],
	newTodo: null,
})

const UpdateTodo = (state, index) => {
	const dones = [...state.dones]
	dones[index] = !dones[index]

	return {
		...state,
		dones,
	}
}

const DeleteTodo = (state, index) => ({
	...state,
	todos: state.todos.toSpliced(index, 1),
	dones: state.dones.toSpliced(index, 1),
})

// View Components
const list = state =>
	html.ul(
		state.todos.map((todo, index) =>
			html.li([
				html.div([
					html.input({
						id: `todo-item-${index}`,
						type: 'checkbox',
						checked: state.dones[index],
						oninput: [UpdateTodo, index],
					}),
					html.label(
						{
							for: `todo-item-${index}`,
							class: { 'line-through': state.dones[index] },
						},
						text(todo)
					),
				]),
				html.button({ onclick: [DeleteTodo, index] }, text('X')),
			])
		)
	)

const textInput = state =>
	html.div({ class: 'new-todo' }, [
		html.input({
			class: 'new-todo-input',
			value: state.newTodo,
			oninput: withTargetValue(SetInputValue),
			onkeydown: withEnterKey(AddTodo),
			placeholder: 'Add new todo...',
		}),
		html.button({ onclick: AddTodo }, text('+')),
	])

// View
const view = state =>
	html.div({ class: 'todo-app' }, [textInput(state), list(state)])

// Export function to create app instance
export default ({ node }) => app({ init, view, node })
