import { app, tag, text, jsonFetcher } from './hyper-utils.js'
import { pipe, compose, map, pluck } from 'https://esm.run/nejquery'

// Create HTML functions
const [div, ul, li] = ['div', 'ul', 'li'].map(tag)
const pluckItems = pluck('items')
const pluckTitle = pluck('title')

// Actions
const GotItems = (state, data) => ({ ...state, items: data })

// State w/ an Effect
const init = url => [{ items: [] }, jsonFetcher(url, GotItems)]

// Helpers
const listItem = pipe(text, li)
const titleToListItem = pipe(pluckTitle, listItem)
const mapTitlesToListItems = map(titleToListItem)
const titles = pipe(pluckItems, mapTitlesToListItems)

// Views
const list = compose(ul, titles)
const view = compose(div, list)

// Export App
export default ({ url, node }) => app({ init: init(url), view, node })
