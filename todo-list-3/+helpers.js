export const todosCount = state => state.todos.length

export const completedTodosCount = state =>
	state.todos.filter(({ isDone }) => isDone).length

export const isSingleTodo = state => todosCount(state) === 1
