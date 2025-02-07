import { app, tag, text } from './hyper-utils.js'

// Compose HTML element functions
const [div] = ['div'].map(tag)

// Data
const targetDate = new Date('2025-02-28T23:59:59').getTime()

// Helper function
const getTimeLeft = () => {
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

// Export app
export default ({ node }) =>
	app({
		init: getTimeLeft(),
		view,
		node,
		subscriptions: _ => [
			[
				dispatch => {
					const interval = setInterval(() => dispatch(getTimeLeft()), 1000)
					return () => clearInterval(interval)
				},
			],
		],
	})
