import { app, tag, text, jsonFetcher } from '../hyperapp.js'
import { pipe, compose, map, pluck } from 'https://esm.run/nejquery'

// Partially applied functions
const pluckFromArray = map(pluck)
const createElements = map(tag)

const [items, title] = pluckFromArray(['items', 'title'])
const [div, ul, li] = createElements(['div', 'ul', 'li'])

// [State, Effect]
const init = url => [{ items: [] }, jsonFetcher(url, GotItems)]

// Actions
const GotItems = (state, data) => ({ ...state, items: data })

// Views
const listItem = pipe(title, text, li)
const listItems = pipe(items, map(listItem))
const view = compose(div, ul, listItems)

// Export App
export default ({ url, node }) => app({ init: init(url), view, node })
