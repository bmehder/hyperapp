export const SetInputValue = (state, value) => ({ ...state, newTodo: value })

export const AddTodo = state =>
	!state.newTodo?.trim()
		? state
		: {
				...state,
				todos: [{ name: state.newTodo, isDone: false }, ...state.todos],
				newTodo: null,
		  }

export const UpdateTodo = (state, index) => {
	const todos = [...state.todos]
	todos[index].isDone = !todos[index].isDone

	return {
		...state,
		todos,
	}
}

export const DeleteTodo = (state, index) => ({
	...state,
	todos: state.todos.toSpliced(index, 1),
})

export const FilterCompleted = state => ({
	...state,
	filter: 'completed',
})

export const FilterRemaining = state => ({
	...state,
	filter: 'remaining',
})

export const FilterAll = state => ({
	...state,
	filter: 'all',
})
