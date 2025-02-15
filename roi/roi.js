import { app, html, text } from '../hyperapp.js'

const Helpers = {
	eachNewClient: state => state.avgSale * (1 + state.repeatPercent / 100),
	toUSD: num =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(num),
}

const Actions = {
	init: () => ({
		avgSale: 500,
		repeatPercent: 10,
		leadsPercent: 10,
		moreLeadsPerMonth: 1,
	}),
	UpdateAvgSale: (state, event) => ({ ...state, avgSale: event.target.value }),
	UpdateRepeatPercent: (state, event) => ({
		...state,
		repeatPercent: event.target.value,
	}),
	UpdateLeadsPercent: (state, event) => ({
		...state,
		leadsPercent: event.target.value,
	}),
	UpdateMoreLeadsPerMonth: (state, event) => ({
		...state,
		moreLeadsPerMonth: event.target.value,
	}),
}

const Views = {
	formGroup: ({
		type = 'number',
		_label,
		value,
		oninput,
		step,
		min,
		max,
		readonly = false,
		infoTitle = null,
		infoDescription = null,
	}) =>
		html.div({ class: 'form-group spread-apart' }, [
			html.label([
				text(_label),
				infoTitle && html.span({ class: 'info-trigger' }, text('i')),
				infoTitle &&
					html.div({ class: 'info' }, [
						html.h3(text(infoTitle)),
						html.p(text(infoDescription)),
					]),
			]),
			html.input({
				type,
				value,
				oninput,
				step,
				min,
				max,
				readonly,
			}),
		]),

	default: state =>
		html.div({ class: 'flow' }, [
			Views.formGroup({
				_label: 'Enter the average amount of a sale for your business:',
				value: state.avgSale,
				oninput: Actions.UpdateAvgSale,
				step: 100,
				infoTitle: 'Average Sales Amount',
				infoDescription:
					'An estimate of the average sale of a client for your business.',
			}),
			Views.formGroup({
				_label: 'Enter the percentage of repeat business:',
				value: state.repeatPercent,
				oninput: Actions.UpdateRepeatPercent,
				min: 0,
				max: 100,
				step: 10,
				infoTitle: 'Repeat Business Rate',
				infoDescription:
					'"Repeat business" is the number of times you make a sale to an existing customer. Say an average sale to a new client is $5000. Say too, that after that project they buy more from you, like 1 out every 4 clients. So then, your repeat business rate is 25%.',
			}),
			Views.formGroup({
				type: 'text',
				_label: 'Cool, each new client you get is worth this amount:',
				value: Helpers.toUSD(Helpers.eachNewClient(state)),
				readonly: true,
				infoTitle: 'Average Customer Value',
				infoDescription:
					"This is how much every new client is worth to your business (on average). For example, your average sale = $6,000. Your average repeat rate = 25%. So then, every time you get a new a client, on average, they're worth $7,500 (avg. sale * avg. repeat rate).",
			}),
			Views.formGroup({
				_label: 'Enter percentage of leads you convert to a paying client:',
				value: state.leadsPercent,
				oninput: Actions.UpdateLeadsPercent,
				min: 0,
				max: 100,
				step: 10,
				infoTitle: 'Lead Conversion Rate',
				infoDescription:
					"How many leads do you talk to before they become a paying customer (on average)? Say you convert 1 out of every 5 leads to a paying client. That's 20% (1 ÷ 5).",
			}),
			Views.formGroup({
				type: 'text',
				_label: 'So then, each new lead is worth this to your business:',
				value: Helpers.toUSD(
					(Helpers.eachNewClient(state) * state.leadsPercent) / 100
				),
				readonly: true,
			}),
			Views.formGroup({
				_label:
					'Now, how many more leads a month do you think you can win with your new, persuasive message?',
				value: state.moreLeadsPerMonth,
				oninput: Actions.UpdateMoreLeadsPerMonth,
			}),
			Views.formGroup({
				type: 'text',
				_label: 'So, this is how much more you could earn per month:',
				value: Helpers.toUSD(
					state.moreLeadsPerMonth *
						parseInt((Helpers.eachNewClient(state) * state.leadsPercent) / 100)
				),
				readonly: true,
			}),
			Views.formGroup({
				type: 'text',
				_label: 'And this is how much more you could earn per year:',
				value: Helpers.toUSD(
					state.moreLeadsPerMonth *
						parseInt((Helpers.eachNewClient(state) * state.leadsPercent) / 100) *
						12
				),
				readonly: true,
			}),
		]),
}
export default ({ node }) => app({ init: Actions.init, view: Views.default, node })
