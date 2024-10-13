const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]

		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = {
			id: decoded.id,
			username: decoded.username,
			role: decoded.role,
		}

		next()
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ message: 'Token expired' })
		}

		return res.status(401).json({ message: 'Unauthorized' })
	}
}

module.exports = checkAuth
