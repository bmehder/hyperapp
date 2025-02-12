import { focuser, dispatcher } from './io.js'

export const withFocus = (action, selector) => state =>
	[state, dispatcher(action), focuser(selector)]

export const withEnterKey = action => (state, payload) =>
	payload.key === 'Enter' ? [action, payload] : state

export const withTargetValue = action => (state, payload) =>
	payload.target.value ? [action, payload.target.value] : state
