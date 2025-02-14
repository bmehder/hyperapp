import { html, app, focus } from '../hyperapp.js'
import * as Views from './+views.js'

const setInitialState = (title = 'Todo List', todos = []) => [
	{
		title,
		todos,
		newTodo: null,
		filter: 'all',
	},
	focus('todo-input'),
]

const view = state =>
	html.div({ class: 'todo-app flow' }, [
		Views.todoTitle(state),
		Views.todoInput(state),
		Views.todoFilters(state),
		Views.todoList(state),
		Views.todosInfo(state),
	])

export default ({ node, title, todos }) =>
	app({ init: setInitialState(title, todos), view, node })
