import { app, html, text } from '../hyperapp.js'

// Action
const GetTimeLeft = _targetDate => {
	const targetDate = new Date(_targetDate).getTime()
	const now = new Date().getTime()
	const diff = targetDate - now
	return {
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

// Custom Subscribers
const onCountdown = (dispatch, { date, _interval }) => {
	const interval = setInterval(() => dispatch(GetTimeLeft(date)), _interval)
	return () => clearInterval(interval)
}

// Export app
export default ({ node, date, interval = 0 }) =>
	app({
		init: [GetTimeLeft, { date, interval }],
		view,
		node,
		subscriptions: _state => [[onCountdown, { date, interval: 1000 }]],
	})
