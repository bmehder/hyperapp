import { app, html, text, jsonFetcher } from '../hyperapp.js'

// [State, Effect]
const setInitialStateAndEffects = url => [{ items: [] }, jsonFetcher(url, GotItems)]

// [Actions, Effect]
// const GotItems = (state, data) => [{ ...state, items: data }, console.log(data)]
const GotItems = (state, data) => ({ ...state, items: data })

// Component Views
const title = item => html.h2(text(item.title))
const postBody = str =>
	text(str.slice(0, 1).toUpperCase().concat(str.slice(1).concat('...')))
const listItem = item => html.li([title(item), html.div(postBody(item.body))])
const listItems = state => state.items.map(listItem)

// Views
const view = state => html.ul({ class: 'auto-fit' }, listItems(state))

// Export App
export default ({ url, node }) =>
	app({ init: setInitialStateAndEffects(url), view, node })
