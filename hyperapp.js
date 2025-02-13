import { h, text, app } from 'https://esm.run/hyperapp'
import * as html from 'https://esm.run/@hyperapp/html'

const tag =
	tag =>
	(props = {}, children = props.tag != null || Array.isArray(props) ? props : []) =>
		h(tag, props === children ? {} : props, children)

const fetchJson = (dispatch, options) => {
	fetch(options.url)
		.then(response => response.json())
		.then(data => dispatch(options.action, data))
}
const jsonFetcher = (url, action) => [fetchJson, { url, action }]

const onClick = onclick => ({ onclick })
const onInput = oninput => ({ oninput })

const withEnterKey = action => (state, payload) =>
	payload.key === 'Enter' ? [action, payload] : state

const withTargetValue = action => (state, payload) =>
	payload.target.value ? [action, payload.target.value] : state

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
}
