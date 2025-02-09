import { app, tag, text } from './hyper-utils.js'
import { map } from 'https://esm.run/nejquery'

// Compose HTML element functions
const [div, label, input] = map(tag)(['div', 'label', 'input'])

// helpers
const eachNewClient = state => state.avgSale * (1 + state.repeatPercent / 100)

const toUSD = num =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(num)

// Init
const init = () => ({
	avgSale: 500,
	repeatPercent: 10,
	leadsPercent: 10,
	moreLeadsPerMonth: 1,
})

// Action
const UpdateAvgSale = (state, event) => ({ ...state, avgSale: event.target.value })
const UpdateRepeatPercent = (state, event) => ({
	...state,
	repeatPercent: event.target.value,
})
const UpdateLeadsPercent = (state, event) => ({
	...state,
	leadsPercent: event.target.value,
})
const UpdateMoreLeadsPerMonth = (state, event) => ({
	...state,
	moreLeadsPerMonth: event.target.value,
})

// View Components
const formGroup = ({
	type = 'number',
	_label,
	value,
	oninput,
	step,
	min,
	max,
	readonly = false,
}) =>
	div({ class: 'form-group spread-apart' }, [
		label(text(_label)),
		input({
			type,
			value,
			oninput,
			step,
			min,
			max,
			readonly,
		}),
	])

// View
const view = state =>
	div({ class: 'flow' }, [
		formGroup({
			_label: 'Enter the average amount of a sale for your business:',
			value: state.avgSale,
			oninput: UpdateAvgSale,
			step: 100,
		}),
		formGroup({
			_label: 'Enter the percentage of repeat business:',
			value: state.repeatPercent,
			oninput: UpdateRepeatPercent,
			min: 0,
			max: 100,
			step: 10,
		}),
		formGroup({
			type: 'text',
			_label: 'Cool, each new client you get is worth this amount:',
			value: toUSD(eachNewClient(state)),
			readonly: true,
		}),
		formGroup({
			_label: 'Enter percentage of leads you convert to a paying client:',
			value: state.leadsPercent,
			oninput: UpdateLeadsPercent,
			min: 0,
			max: 100,
			step: 10,
		}),
		formGroup({
			type: 'text',
			_label: 'So then, each new lead is worth this to your business:',
			value: toUSD((eachNewClient(state) * state.leadsPercent) / 100),
			readonly: true,
		}),
		formGroup({
			_label:
				'Now, how many more leads a month do you think you can win with your new, persuasive message?',
			value: state.moreLeadsPerMonth,
			oninput: UpdateMoreLeadsPerMonth,
		}),
		formGroup({
			type: 'text',
			_label: 'So, this is how much more you could earn per month:',
			value: toUSD(
				state.moreLeadsPerMonth *
					parseInt((eachNewClient(state) * state.leadsPercent) / 100)
			),
			readonly: true,
		}),
		formGroup({
			type: 'text',
			_label: 'And this is how much more you could earn per year:',
			value: toUSD(
				state.moreLeadsPerMonth *
					parseInt((eachNewClient(state) * state.leadsPercent) / 100) *
					12
			),
			readonly: true,
		}),
	])

// Export app
export default ({ node }) => app({ init, view, node })
