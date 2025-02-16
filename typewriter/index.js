import { app, html, text, every, delay } from '../hyperapp.js'

// const Helpers = {
// 	wordLength: word => word.length,
// }

const Actions = {
	init: () => ({
		words: [
			'Science',
			'Math',
			// 'English',
			// 'History',
			// 'Bible',
			// 'Languages',
			// 'History',
			// 'Technology',
			'Art',
		],
		output: '',
		charIndex: 0,
		wordIndex: 0,
		isTyping: true,
		delay: 200,
	}),
	TypeLetter: state => ({
		...state,
		output:
			state.charIndex < state.words[state.wordIndex].length
				? state.output + state.words[state.wordIndex][state.charIndex]
				: '',
		charIndex:
			state.charIndex < state.words[state.wordIndex].length
				? state.charIndex + 1
				: 0,
		wordIndex:
			state.charIndex === state.words[state.wordIndex].length
				? state.wordIndex + 1
				: state.wordIndex,
		isTyping: !(
			state.wordIndex === state.words.length - 1 &&
			state.charIndex === state.words[state.wordIndex].length - 1
		),
	}),
}

const Views = {
	default: state => html.div([text('MyFun'), text(state.output)]),
}

export default ({ node }) =>
	app({
		node,
		init: Actions.init,
		view: Views.default,
		subscriptions: state =>
			state.isTyping && [every(state.delay, Actions.TypeLetter)],
	})
