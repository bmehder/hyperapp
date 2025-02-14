import { html, app, focuser } from '../hyperapp.js'
import * as Views from './+views.js'

const setInitialState = title => [
	{
		todos: [],
		newTodo: null,
		filter: 'all',
		title,
	},
	focuser('.new-todo-input'),
]

const view = state =>
	html.div({ class: 'todo-app flow' }, [
		Views.todoTitle(state),
		Views.todoInput(state),
		Views.todoFilters(state),
		Views.todoList(state),
		Views.todosInfo(state),
	])

export default ({ node, title = 'Todo List' }) =>
	app({ init: setInitialState(title), view, node })
