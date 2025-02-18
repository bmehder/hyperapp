import { html, app, focus } from '../hyperapp.js'
import * as Views from './+views.js'

const setInitialState = (title = 'Todo List', todos = []) => [
	{
		title,
		todos,
		newTodo: null,
		filteredBy: 'all',
	},
	focus('todo-input'),
]

const view = state =>
	html.div({ class: 'todo-app flow' }, [
		Views.title(state),
		Views.newTodo(state),
		Views.filters(state),
		Views.list(state),
		Views.info(state),
	])

export default ({ node, title, todos }) =>
	app({ init: setInitialState(title, todos), view, node })
