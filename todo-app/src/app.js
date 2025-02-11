import { h, text, app } from 'https://esm.run/hyperapp'
import * as html from 'https://esm.run/@hyperapp/html'
import { focuser } from './lib/io.js'

// Helpers
const withEnterKey = action => (state, payload) => {
	if (payload.key && payload.key === 'Enter') return [action, payload]
	return state
}

const withTargetValue = action => (state, payload) => {
	if (payload.target && payload.target.value) return [action, payload.target.value]
	return state
}

// Actions
const InputNewItem = (state, input) => ({
	...state,
	newitem: input,
})

const AddItem = state =>
	!state.newitem
		? state
		: {
				...state,
				items: [state.newitem, ...state.items],
				done: [false, ...state.done],
				newitem: null,
		  }

const ToggleDone = (state, index) => {
	let done = [...state.done]
	done[index] = !done[index]
	return { ...state, done }
}

const Delete = (state, index) => {
	let items = [...state.items]
	let done = [...state.done]
	items.splice(index, 1)
	done.splice(index, 1)
	return { ...state, items, done }
}

const StartEditing = (state, index) => {
	return [
		{
			...state,
			editing: index,
		},
		focuser('.itemlist input[type=text]'),
	]
}

const StopEditing = state => ({
	...state,
	editing: null,
})

const InputEditing = (state, input) => {
	let items = [...state.items]
	items[state.editing] = input
	return { ...state, items }
}

// The App
export default ({ node }) =>
	app({
		init: [
			{ newitem: null, items: [], done: [], editing: null },
			focuser('.newitementry input[type=text'),
		],
		view: state =>
			html.div([
				html.header(html.h1(text('Todo App'))),
				html.main([
					html.section({ class: 'newitementry' }, [
						html.input({
							type: 'text',
							value: state.newitem,
							oninput: withTargetValue(InputNewItem),
							placeholder: 'What do you need to do?',
							onkeypress: withEnterKey(AddItem),
						}),
						html.button({ onclick: AddItem }, text('+')),
					]),
					html.section({ class: 'itemlist' }, [
						html.ul(
							state.items.map((itemText, index) =>
								html.li(
									state.editing === index
										? html.input({
												type: 'text',
												value: state.items[index],
												oninput: withTargetValue(InputEditing),
												onblur: StopEditing,
												onkeypress: withEnterKey(StopEditing),
										  })
										: [
												html.input({
													type: 'checkbox',
													checked: state.done[index],
													oninput: [ToggleDone, index],
												}),
												html.span(
													{
														onclick: [StartEditing, index],
														class: { done: state.done[index] },
													},
													text(itemText)
												),
												html.button({ onclick: [Delete, index] }, text('X')),
										  ]
								)
							)
						),
					]),
				]),
			]),
		node,
	})
