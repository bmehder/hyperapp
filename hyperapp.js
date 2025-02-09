import { h, text, app } from 'https://esm.run/hyperapp'

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

export { text, app, tag, onClick, onInput, jsonFetcher }
