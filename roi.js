import { app, tag, text } from './hyper-utils.js'

// Compose HTML element functions
const [div, label, input] = ['div', 'label', 'input'].map(tag)

// Data

// Init
const init = () => ({
	avgSale: 500,
	repeatPercent: 10,
	leadsPercent: 10,
	moreLeadsPerMonth: 1,
})

// helpers
const eachNewClient = state => state.avgSale * (1 + state.repeatPercent / 100)

// Action
const SetAvgSale = (state, event) => ({ ...state, avgSale: event.target.value })
const SetRepeatPercent = (state, event) => ({
	...state,
	repeatPercent: event.target.value,
})
const SetLeadsPercent = (state, event) => ({
	...state,
	leadsPercent: event.target.value,
})
const SetMoreLeadsPerMonth = (state, event) => ({
	...state,
	moreLeadsPerMonth: event.target.value,
})
// View Component

// View
const view = state =>
	div({ class: 'flow' }, [
		div([
			label(text('Enter the average amount of a sale for your business:')),
			input({
				type: 'number',
				value: state.avgSale,
				oninput: SetAvgSale,
				step: 100,
			}),
		]),
		div([
			label(text('Enter the percentage of repeat business:')),
			input({
				type: 'number',
				value: state.repeatPercent,
				oninput: SetRepeatPercent,
				step: 10,
			}),
		]),
		div([
			label(text('Cool, each new client you get is worth this amount:')),
			input({
				type: 'number',
				value: eachNewClient(state),
				readonly: true,
			}),
		]),
		div([
			label(text('Enter percentage of leads you convert to a paying client:')),
			input({
				type: 'number',
				value: state.leadsPercent,
				oninput: SetLeadsPercent,
				step: 10,
			}),
		]),
		div([
			label(text('So then, each new lead is worth this to your business:')),
			input({
				type: 'number',
				value: parseInt((eachNewClient(state) * state.leadsPercent) / 100),
				readonly: true,
			}),
		]),
		div([
			label(
				text(
					'Now, how many more leads a month do you think you can win with your new, persuasive message?'
				)
			),
			input({
				type: 'number',
				value: state.moreLeadsPerMonth,
				oninput: SetMoreLeadsPerMonth,
			}),
		]),
		div([
			label(text('So, this is how much more you could earn per month:')),
			input({
				type: 'number',
				value: parseInt(
					state.moreLeadsPerMonth *
						parseInt((eachNewClient(state) * state.leadsPercent) / 100)
				),
				oninput: SetMoreLeadsPerMonth,
				readonly: true,
			}),
		]),
		div([
			label(text('And this is how much more you could earn per year:')),
			input({
				type: 'number',
				value: parseInt(
					state.moreLeadsPerMonth *
						parseInt((eachNewClient(state) * state.leadsPercent) / 100) *
						12
				),
				readonly: true,
			}),
		]),
	])

// Export app
export default ({ node }) =>
	app({
		init,
		view,
		node,
	})
