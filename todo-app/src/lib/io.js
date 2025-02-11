const _focuser = (_, options) => {
	requestAnimationFrame(() => {
		document.querySelector(options.selector)?.focus()
	})
}

export const focuser = selector => [_focuser, { selector }]
