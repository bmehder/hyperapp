import { app, html, text, withTargetValue, focus } from '../hyperapp.js'

const init = [{ c: 0, f: 32 }, focus('celsius')]

const Actions = {
	SetCelsius: (_, x) => ({ c: x, f: parseInt((x * 9) / 5 + 32) }),
	SetFarenheit: (_, x) => ({ f: x, c: parseInt(((x - 32) * 5) / 9) }),
}

const Views = {
	tempUnit: ({ label, id, value, oninput }) =>
		html.div([
			html.label(text(label)),
			html.input({
				id,
				type: 'number',
				value,
				oninput,
			}),
		]),

	equals: () => html.div({ class: 'equals' }, text('=')),

	default: state =>
		html.div({ class: 'app-temperature' }, [
			Views.tempUnit({
				label: 'Celsius',
				id: 'celsius',
				value: state.c,
				oninput: withTargetValue(Actions.SetCelsius),
			}),
			Views.equals(),
			Views.tempUnit({
				label: 'Fahrenheit',
				id: 'fahrenheit',
				value: state.f,
				oninput: withTargetValue(Actions.SetFarenheit),
			}),
		]),
}

export default ({ node }) =>
	app({
		node,
		init,
		view: Views.default,
	})
