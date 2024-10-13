const User = require('@/models/userModel')

const checkAdmin = async (req, res, next) => {
	try {
		const { id } = req.user

		const user = await User.findById(id)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		if (user.role !== 'admin') {
			return res.status(403).json({ message: 'Forbidden' })
		}

		next()
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

module.exports = checkAdmin
