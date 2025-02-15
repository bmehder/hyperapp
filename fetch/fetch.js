import { app, html, text, jsonFetcher } from '../hyperapp.js'

const Helpers = {
	toProperCase: str => str.slice(0, 1).toUpperCase().concat(str.slice(1)),
}

const Actions = {
	SetInitialStateAndEffects: (_state, url) => [
		{ items: [] },
		jsonFetcher(url, Actions.GotItems),
	],
	GotItems: (state, data) => ({ ...state, items: data }),
}

const Views = {
	title: item => html.h2(text(item.title)),
	postBody: str => Helpers.toProperCase(str).concat('...'),
	listItem: item =>
		html.li([Views.title(item), html.div(text(Views.postBody(item.body)))]),
	listItems: state => state.items.map(Views.listItem),
	default: state => html.ul({ class: 'auto-fit' }, Views.listItems(state)),
}

export default ({ url, node }) =>
	app({ init: [Actions.SetInitialStateAndEffects, url], view: Views.default, node })
