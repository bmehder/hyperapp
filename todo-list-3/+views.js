import { html, text, withEnterKey, withTargetValue } from '../hyperapp.js'
import * as Actions from './+actions.js'
import * as Helpers from './+helpers.js'

export const todoTitle = ({ title }) => html.h1(text(title))

export const todoInput = state =>
	html.div({ class: 'new-todo' }, [
		html.input({
			class: 'new-todo-input',
			value: state.newTodo,
			oninput: withTargetValue(Actions.SetInputValue),
			onkeydown: withEnterKey(Actions.AddTodo),
			placeholder: 'Add new todo...',
		}),
		html.button({ onclick: Actions.AddTodo }, text('+')),
	])

const listItem = todos =>
	html.ul(
		todos.map((todo, index) =>
			html.li([
				html.div({ class: 'form-group' }, [
					html.input({
						id: `todo-item-${index}`,
						type: 'checkbox',
						checked: todo.isDone,
						oninput: [Actions.UpdateTodo, index],
					}),
					html.label(
						{
							for: `todo-item-${index}`,
							class: { 'line-through': todo.isDone },
						},
						text(todo.name)
					),
				]),
				html.button({ onclick: [Actions.DeleteTodo, index] }, text('X')),
			])
		)
	)

export const todoList = state =>
	state.filter === 'completed'
		? listItem(state.todos.filter(({ isDone }) => isDone))
		: state.filter === 'remaining'
		? listItem(state.todos.filter(({ isDone }) => !isDone))
		: listItem(state.todos)

export const todosInfo = state =>
	html.p([
		text(Helpers.completedTodosCount(state)),
		text(' / '),
		text(
			Helpers.todosCount(state) +
				(Helpers.isSingleTodo(state) ? ' todo completed' : ' todos completed')
		),
	])

const filterButton = ({ selected, onclick, txt }) =>
	html.button({ class: { selected }, onclick }, text(txt))

export const todoFilters = state =>
	html.div({ class: 'filter-buttons' }, [
		filterButton({
			selected: state.filter === 'all',
			onclick: Actions.ShowAll,
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
