import { app, tag, text } from './hyper-utils.js'

// Compose HTML element functions
const [div] = ['div'].map(tag)

// Data
const targetDate = new Date('2025-02-28T23:59:59').getTime()

// Action
const GetTimeLeft = () => {
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
	div({ class: 'item' }, [
		div({ class: 'item-counter' }, text(value.toString().padStart(2, '0'))),
		div({ class: 'item-heading' }, [text(label)]),
	])

// View
const view = state =>
	div({ class: 'counter-app' }, [
		item(state.days, 'Days'),
		item(state.hours, 'Hours'),
		item(state.minutes, 'Mins'),
		item(state.seconds, 'Secs'),
	])

// Custom Subscribers
const countdown = dispatch => {
	const interval = setInterval(() => dispatch(GetTimeLeft), 1000)
	return () => clearInterval(interval)
}

// Export app
export default ({ node }) =>
	app({
		init: GetTimeLeft(),
		view,
		node,
		subscriptions: _state => [[countdown]],
	})
