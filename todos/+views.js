import { html, tag, text, withEnterKey, withTargetValue } from '../hyperapp.js'
import * as Actions from './+actions.js'

// Title
export const todoTitle = ({ title }) => html.h1(text(title))

// Todo Input
export const todoInput = state =>
	html.div({ class: 'new-todo' }, [
		html.input({
			id: 'todo-input',
			value: state.newTodo,
			oninput: withTargetValue(Actions.SetInputValue),
			onkeydown: withEnterKey(Actions.AddTodo),
			placeholder: 'Add new todo...',
		}),
		html.button({ onclick: Actions.AddTodo }, text('+')),
	])

// Filter Buttons
const filterButton = ({ selected, onclick, txt }) =>
	html.li(html.button({ class: { selected }, onclick }, text(txt)))

export const todoFilters = state =>
	tag('menu')({ class: 'filter-buttons' }, [
		filterButton({
			selected: state.filter === 'all',
			onclick: Actions.FilterAll,
			txt: 'All',
		}),
		filterButton({
			selected: state.filter === 'completed',
			onclick: Actions.FilterCompleted,
			txt: 'Completed',
		}),
		filterButton({
			selected: state.filter === 'remaining',
			onclick: Actions.FilterRemaining,
			txt: 'Remaining',
		}),
	])

// Todo List
const _todoList = todos =>
	html.ul(
		todos.map((todo, index) =>
			html.li({ class: 'todo-list-item' }, [
				html.div({ class: 'form-group' }, [
					html.input({
						id: 'todo-item-' + index,
						type: 'checkbox',
						checked: todo.isDone,
						oninput: [Actions.UpdateTodo, index],
					}),
					html.label(
						{
							for: 'todo-item-' + index,
							class: { 'line-through': todo.isDone },
						},
						text(todo.name)
					),
				]),
				html.button({ onclick: [Actions.DeleteTodo, index] }, text('X')),
			])
		)
	)

const isDone = ({ isDone }) => isDone
const isNotDone = ({ isDone }) => !isDone

export const todoList = state =>
	state.filter === 'completed'
		? _todoList(state.todos.filter(isDone))
		: state.filter === 'remaining'
		? _todoList(state.todos.filter(isNotDone))
		: _todoList(state.todos)

// Todos Info
const todosCount = state => state.todos.length

const completedTodosCount = state =>
	state.todos.filter(({ isDone }) => isDone).length

const isSingleTodo = state => state.todos.length === 1

export const todosInfo = state =>
	html.p([
		text(completedTodosCount(state)),
		text(' / '),
		text(
			todosCount(state) +
				(isSingleTodo(state) ? ' todo completed' : ' todos completed')
		),
	])
