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
		show: 'all',
	},
	focuser('.new-todo-input'),
]

// Derived State
const todosCount = state => state.todos.length
const completedTodosCount = state => state.dones.filter(Boolean).length
const isSingleTodo = state => todosCount(state) === 1

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
const todoTitle = () => html.h1(text('Todo List'))

const todoInput = state =>
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

const todoList = state =>
	html.ul(
		state.todos.map((todo, index) =>
			html.li([
				html.div({ class: 'form-group' }, [
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

const todosInfo = state =>
	html.p([
		text(completedTodosCount(state)),
		text(' / '),
		text(todosCount(state) + (isSingleTodo(state) ? ' todo' : ' todos')),
	])

// View
const view = state =>
	html.div({ class: 'todo-app' }, [
		todoTitle(),
		todoInput(state),
		todoList(state),
		todosInfo(state),
	])

// Export function to create app instance
export default ({ node }) => app({ init, view, node })
