const validateUsername = (username, require = true) => {
	if (require) {
		if (!username) {
			throw new Error('Username is required')
		}
	}

	if (username) {
		if (username.length < 6) {
			throw new Error('Username must be at least 6 characters long')
		}

		if (!/^[a-zA-Z0-9]+$/.test(username)) {
			throw new Error(
				'Username must contain only alphanumeric characters'
			)
		}
	}
}

const validatePassword = (password, require = true) => {
	if (require) {
		if (!password) {
			throw new Error('Password is required')
		}
	}

	if (password) {
		if (password.length < 6) {
			throw new Error('Password must be at least 6 characters long')
		}
	}
}

const validateEmail = (email, require = true) => {
	if (require) {
		if (!email) {
			throw new Error('Email is required')
		}
	}

	if (email) {
		if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
			throw new Error('Invalid email address')
		}
	}
}

module.exports = {
	validateUsername,
	validatePassword,
	validateEmail,
}
