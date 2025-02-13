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
		newTodo: null,
		filter: 'all',
	},
	focuser('.new-todo-input'),
]

// Derived State
const todosCount = state => state.todos.length
const completedTodosCount = state =>
	state.todos.filter(({ isDone }) => isDone).length
const isSingleTodo = state => todosCount(state) === 1

// Actions
const SetInputValue = (state, value) => ({ ...state, newTodo: value })

const AddTodo = state => ({
	...state,
	todos: [{ name: state.newTodo, isDone: false }, ...state.todos],
	newTodo: null,
})

const UpdateTodo = (state, index) => {
	const todos = [...state.todos]
	todos[index].isDone = !todos[index].isDone

	return {
		...state,
		todos,
	}
}

const DeleteTodo = (state, index) => ({
	...state,
	todos: state.todos.toSpliced(index, 1),
})

const FilterCompleted = state => ({
	...state,
	filter: 'completed',
})

const FilterRemaining = state => ({
	...state,
	filter: 'remaining',
})

const ShowAll = state => ({
	...state,
	filter: 'all',
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

const todoList = state => {
	if (state.filter === 'all') {
		return html.ul(
			state.todos.map((todo, index) =>
				html.li([
					html.div({ class: 'form-group' }, [
						html.input({
							id: `todo-item-${index}`,
							type: 'checkbox',
							checked: todo.isDone,
							oninput: [UpdateTodo, index],
						}),
						html.label(
							{
								for: `todo-item-${index}`,
								class: { 'line-through': todo.isDone },
							},
							text(todo.name)
						),
					]),
					html.button({ onclick: [DeleteTodo, index] }, text('X')),
				])
			)
		)
	}

	if (state.filter === 'completed') {
		return html.ul(
			state.todos
				.filter(({ isDone }) => isDone)
				.map((todo, index) =>
					html.li([
						html.div({ class: 'form-group' }, [
							html.input({
								id: `todo-item-${index}`,
								type: 'checkbox',
								checked: todo.isDone,
								oninput: [UpdateTodo, index],
							}),
							html.label(
								{
									for: `todo-item-${index}`,
									class: { 'line-through': todo.isDone },
								},
								text(todo.name)
							),
						]),
						html.button({ onclick: [DeleteTodo, index] }, text('X')),
					])
				)
		)
	}

	if (state.filter === 'remaining') {
		return html.ul(
			state.todos
				.filter(({ isDone }) => !isDone)
				.map((todo, index) =>
					html.li([
						html.div({ class: 'form-group' }, [
							html.input({
								id: `todo-item-${index}`,
								type: 'checkbox',
								checked: todo.isDone,
								oninput: [UpdateTodo, index],
							}),
							html.label(
								{
									for: `todo-item-${index}`,
									class: { 'line-through': todo.isDone },
								},
								text(todo.name)
							),
						]),
						html.button({ onclick: [DeleteTodo, index] }, text('X')),
					])
				)
		)
	}
}

const todosInfo = state =>
	html.p([
		text(completedTodosCount(state)),
		text(' / '),
		text(
			todosCount(state) +
				(isSingleTodo(state) ? ' todo completed' : ' todos completed')
		),
	])

const todoFilters = state =>
	html.div([
		html.button({ onclick: ShowAll }, text('All')),
		html.button({ onclick: FilterCompleted }, text('Completed')),
		html.button({ onclick: FilterRemaining }, text('Remaining')),
	])

// View
const view = state =>
	html.div({ class: 'todo-app' }, [
		todoTitle(),
		todoInput(state),
		todoList(state),
		todosInfo(state),
		todoFilters(state),
	])

// Export function to create app instance
export default ({ node }) => app({ init, view, node })
