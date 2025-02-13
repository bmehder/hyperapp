import { text, app } from 'https://esm.run/hyperapp'
import * as html from 'https://esm.run/@hyperapp/html'
import { focuser } from './lib/io.js'
import { list } from './lib/views.js'
import todoItem from './todo-item.js'
import * as AddItem from './add-item.js'

const addItem = AddItem.wire({
	get: state => state.newitem,
	set: (state, newitem) => ({ ...state, newitem }),
	onadd: (state, newitem) => ({
		...state,
		items: [newitem, ...state.items],
		done: [false, ...state.done],
	}),
})

// Actions
const ToggleDone = (state, index) => {
	const done = [...state.done]
	done[index] = !done[index]
	return { ...state, done }
}

const Delete = (state, index) => ({
	...state,
	items: state.items.toSpliced(index, 1),
	done: state.done.toSpliced(index, 1),
})

const StartEditing = (state, index) => ({
	...state,
	editing: index,
})

const StopEditing = state => ({
	...state,
	editing: null,
})

const InputEditing = (state, value) => {
	const items = [...state.items]
	items[state.editing] = value
	return { ...state, items }
}

// The App
export default ({ node }) =>
	app({
		init: [
			{ newitem: AddItem.init(), items: [], done: [], editing: null },
			focuser('.newitementry input[type=text]'),
		],
		view: state =>
			html.div([
				html.header(html.h1(text('Todo App'))),
				html.main([
					html.section(
						{ class: 'newitementry' },
						AddItem.view(addItem.model(state))
					),
					html.section(
						{ class: 'itemlist' },
						list({
							items: state.items,
							render: (_, index) =>
								todoItem({
									value: state.items[index],
									editing: state.editing === index,
									checked: state.done[index],
									onedit: [StartEditing, index],
									oninput: InputEditing,
									ondone: StopEditing,
									onblur: StartEditing,
									ontoggle: [ToggleDone, index],
									ondelete: [Delete, index],
								}),
						})
					),
				]),
			]),
		node,
	})
