const bcrypt = require('bcrypt')
const User = require('@/models/userModel')
const {
	hashPassword,
	validatePassword,
	validateUsername,
	validateEmail,
	pagination,
} = require('@/utils')

const userController = {
	getProfileUser: async (req, res) => {
		try {
			const { id } = req.user

			const user = await User.findById(id).select('-password')

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			return res.status(200).json({
				message: 'Get profile user successfully',
				user,
			})
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
	changePassword: async (req, res) => {
		try {
			const { id } = req.user

			const { oldPassword, newPassword, confirmPassword } = req.body

			validatePassword(newPassword)

			if (newPassword !== confirmPassword) {
				return res
					.status(400)
					.json({ message: 'Password does not match' })
			}

			const user = await User.findById(id)

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const isPasswordValid = await bcrypt.compare(
				oldPassword,
				user.password
			)

			if (!isPasswordValid) {
				return res.status(400).json({ message: 'Invalid password' })
			}

			const hashedPassword = await hashPassword(newPassword)

			user.password = hashedPassword

			await user.save()

			return res
				.status(200)
				.json({ message: 'Change password successfully' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
	createUser: async (req, res) => {
		try {
			const { username, password, email, note, role } = req.body

			validateUsername(username)
			validatePassword(password)
			validateEmail(email, false)

			const existingUser = await User.findOne({ username })

			if (existingUser) {
				return res
					.status(400)
					.json({ message: 'Username already exists' })
			}

			const hashedPassword = await hashPassword(password)

			const newUser = new User({
				username,
				password: hashedPassword,
				email,
				note,
				role,
			})

			await newUser.save()

			return res.status(201).json({ message: 'Create user successfully' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
	updateUser: async (req, res) => {
		try {
			const { id } = req.params
			const { password, email, note, role } = req.body

			validatePassword(password, false)
			validateEmail(email, false)

			const user = await User.findById(id)

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			if (password) {
				validatePassword(password)
				const hashedPassword = await hashPassword(password)
				user.password = hashedPassword
			}

			user.email = email || user.email
			user.note = note || user.note
			user.role = role || user.role

			await user.save()

			return res.status(200).json({ message: 'Update user successfully' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
	deleteUser: async (req, res) => {
		try {
			const { id } = req.params

			if (id === req.user.id) {
				return res
					.status(400)
					.json({ message: 'You cannot delete yourself' })
			}

			const user = await User.findByIdAndDelete(id)

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			return res.status(200).json({ message: 'Delete user successfully' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
	getAllUsers: async (req, res) => {
		try {
			const conditions = {}

			const results = await pagination(
				User,
				req.query,
				conditions,
				'-password'
			)

			if (results.total === 0) {
				return res.status(404).json({ message: 'Users not found' })
			}

			return res.status(200).json({
				message: 'Get all users successfully',
				total: results.total,
				users: results.results,
			})
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
}

module.exports = userController
