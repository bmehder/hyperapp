import { h, text, app } from 'https://esm.run/hyperapp'
import * as html from 'https://esm.run/@hyperapp/html'
import { focus, blur } from 'https://unpkg.com/@hyperapp/dom'
import { every, delay, now } from 'https://unpkg.com/@hyperapp/time'
import { pipe, see, not, isNullish } from 'https://esm.run/nejquery'

const tag =
	tag =>
	(props = {}, children = props.tag != null || Array.isArray(props) ? props : []) =>
		h(tag, props === children ? {} : props, children)

const fetchJson = (dispatch, payload) => {
	fetch(payload.url)
		.then(response => response.json())
		.then(data => dispatch(payload.action, data))
}
const jsonFetcher = (url, action) => [fetchJson, { url, action }]

const onClick = onclick => ({ onclick })
const onInput = oninput => ({ oninput })

const withEnterKey = action => (state, payload) =>
	payload.key === 'Enter' ? [action, payload] : state

const withTargetValue = action => (state, payload) =>
	payload.target.value ? [action, payload.target.value] : state

const withConfirmation = action => (state, index) =>
	confirm('Are you sure you want to delete this todo item?')
		? [action, index]
		: state

const withLogging = dispatch => (action, props) => {
	console.group(`Action: ${action.name || 'anonymous'}`)
	console.log('Props:', props)
	const result = dispatch(action, props)
	console.log('New State:', result)
	console.groupEnd()
	return result
}

const log = state => {
	console.log('State changed:', state)
	return state
}

const preventDefault = action => (state, event) =>
	[state, [dispatch => (event.preventDefault(), dispatch(action))]]

export {
	h,
	html,
	text,
	app,
	tag,
	onClick,
	onInput,
	jsonFetcher,
	preventDefault,
	withEnterKey,
	withTargetValue,
	withConfirmation,
	withLogging,
	focus,
	blur,
	log,
	pipe,
	see,
	every,
	delay,
	now,
	not,
	isNullish,
}
