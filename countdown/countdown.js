import { app, html, text, every } from '../hyperapp.js'

// Action
const GetTimeLeft = (_, date) => {
	const targetDate = new Date(date).getTime()
	const now = new Date().getTime()
	const diff = targetDate - now
	return {
		targetDate,
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	}
}

// View Component
const item = (value, label) =>
	html.div({ class: 'item' }, [
		html.div({ class: 'item-counter' }, text(value.toString().padStart(2, '0'))),
		html.div({ class: 'item-heading' }, [text(label)]),
	])

// View
const view = state =>
	html.div({ class: 'counter-app' }, [
		item(state.days, 'Days'),
		item(state.hours, 'Hours'),
		item(state.minutes, 'Mins'),
		item(state.seconds, 'Secs'),
	])

// Export app
export default ({ node, date }) =>
	app({
		init: [GetTimeLeft, date],
		view,
		node,
		subscriptions: state => [every(1000, [GetTimeLeft, date])],
	})
