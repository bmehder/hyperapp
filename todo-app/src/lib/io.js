const _focuser = (_, options) => {
	requestAnimationFrame(() => {
		document.querySelector(options.selector)?.focus()
	})
}

export const focuser = selector => [_focuser, { selector }]

const _dispatcher = (dispatch, options) => dispatch(options.action, options.payload)

export const dispatcher = (action, payload) => [_dispatcher, { action, payload }]
