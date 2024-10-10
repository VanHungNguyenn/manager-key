const SessionStorage = {
	setItem: (key: string, value: string) => {
		window.sessionStorage.setItem(key, value)
	},

	getItem: (key: string) => {
		return window.sessionStorage.getItem(key)
	},

	removeItem: (key: string) => {
		window.sessionStorage.removeItem(key)
	},

	clear: () => {
		window.sessionStorage.clear()
	},
}

export default SessionStorage
