import {
	html,
	tag,
	text,
	not,
	withEnterKey,
	withTargetValue,
	withConfirmation,
} from '../hyperapp.js'
import * as Actions from './+actions.js'

// Helpers
const isDone = ({ isDone }) => isDone
const isNotDone = not(isDone)

export const title = ({ title }) => html.h1(text(title))

export const newTodo = state =>
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

const filterButton = ({ textContent, isSelected, onclick }) =>
	html.li(html.button({ class: { isSelected }, onclick }, text(textContent)))

export const filters = state =>
	tag('menu')({ class: 'filter-buttons' }, [
		filterButton({
			textContent: 'All',
			isSelected: state.filteredBy === 'all',
			onclick: Actions.FilterAll,
		}),
		filterButton({
			textContent: 'Completed',
			isSelected: state.filteredBy === 'completed',
			onclick: Actions.FilterCompleted,
		}),
		filterButton({
			textContent: 'Remaining',
			isSelected: state.filteredBy === 'remaining',
			onclick: Actions.FilterRemaining,
		}),
	])

const todoList = todos =>
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
				html.button(
					{ onclick: withConfirmation(Actions.DeleteTodo, index) },
					text('X')
				),
			])
		)
	)

export const list = state =>
	state.filteredBy === 'completed'
		? todoList(state.todos.filter(isDone))
		: state.filteredBy === 'remaining'
		? todoList(state.todos.filter(isNotDone))
		: todoList(state.todos)

const todosCount = state => state.todos.length

const completedTodosCount = state => state.todos.filter(isDone).length

const isSingleTodo = state => state.todos.length === 1

export const info = state =>
	html.div([
		text(completedTodosCount(state)),
		text(' / '),
		text(
			todosCount(state) +
				(isSingleTodo(state) ? ' todo completed' : ' todos completed')
		),
	])
