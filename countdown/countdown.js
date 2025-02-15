import { app, html, text, every } from '../hyperapp.js'

const Helpers = {
	getDays: diff => Math.floor(diff / (1000 * 60 * 60 * 24)),
	getHours: diff => Math.floor((diff / (1000 * 60 * 60)) % 24),
	getMinutes: diff => Math.floor((diff / (1000 * 60)) % 60),
	getSeconds: diff => Math.floor((diff / 1000) % 60),
}

const Actions = {
	default: (state, date) => {
		const targetDate = state?.targetDate ?? new Date(date).getTime()
		const now = new Date().getTime()
		const diff = targetDate - now

		return {
			targetDate,
			days: Helpers.getDays(diff),
			hours: Helpers.getHours(diff),
			minutes: Helpers.getMinutes(diff),
			seconds: Helpers.getSeconds(diff),
		}
	},
}

const Views = {
	timeUnit: (value, label) =>
		html.div({ class: 'item' }, [
			html.div({ class: 'item-heading' }, text(label)),
			html.div({ class: 'item-counter' }, text(value.toString().padStart(2, '0'))),
		]),

	default: state =>
		html.div({ class: 'counter-view' }, [
			Views.timeUnit(state.days, 'Days'),
			Views.timeUnit(state.hours, 'Hours'),
			Views.timeUnit(state.minutes, 'Mins'),
			Views.timeUnit(state.seconds, 'Secs'),
		]),
}

export default ({ node, date }) =>
	app({
		init: [Actions.default, date],
		view: Views.default,
		node,
		subscriptions: state => [every(1000, [Actions.default, state.date])],
	})
