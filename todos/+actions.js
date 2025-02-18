export const SetInputValue = (state, value) => ({ ...state, newTodo: value })

export const AddTodo = state =>
	!state.newTodo?.trim()
		? state
		: {
				...state,
				todos: [{ name: state.newTodo, isDone: false }, ...state.todos],
				newTodo: null,
		  }

export const UpdateTodo = (state, index) => ({
	...state,
	todos: state.todos.toSpliced(index, 1, {
		...state.todos[index],
		isDone: !state.todos[index].isDone,
	}),
})

export const DeleteTodo = (state, index) => ({
	...state,
	todos: state.todos.toSpliced(index, 1),
})

export const FilterCompleted = state => ({
	...state,
	filteredBy: 'completed',
})

export const FilterRemaining = state => ({
	...state,
	filteredBy: 'remaining',
})

export const FilterAll = state => ({
	...state,
	filteredBy: 'all',
})
