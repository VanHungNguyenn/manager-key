const bcrypt = require('bcrypt')
const User = require('@/models/userModel')
const {
	hashPassword,
	createToken,
	validateUsername,
	validatePassword,
} = require('@/utils')

const authController = {
	register: async (req, res) => {
		try {
			const { username, password, confirmPassword } = req.body

			validateUsername(username)
			validatePassword(password)

			if (password !== confirmPassword) {
				return res
					.status(400)
					.json({ message: 'Passwords do not match' })
			}

			const existingUser = await User.findOne({ username })

			if (existingUser) {
				return res.status(400).json({ message: 'User already exists' })
			}

			const hashedPassword = await hashPassword(password)

			const newUser = new User({
				username,
				password: hashedPassword,
			})

			await newUser.save()

			res.status(201).json({ message: 'User created successfully' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
	login: async (req, res) => {
		try {
			const { username, password } = req.body

			validateUsername(username)
			validatePassword(password)

			const user = await User.findOne({ username })

			if (!user) {
				return res
					.status(400)
					.json({ message: 'Username or password is incorrect' })
			}

			const isPasswordValid = await bcrypt.compare(
				password,
				user.password
			)

			if (!isPasswordValid) {
				return res
					.status(400)
					.json({ message: 'Username or password is incorrect' })
			}

			const token = createToken({
				id: user._id,
				username: user.username,
				role: user.role,
			})

			const { password: userPassword, ...userWithoutPassword } =
				user.toObject()

			res.status(200).json({
				message: 'Login successful',
				token: token,
				user: userWithoutPassword,
			})
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
}

module.exports = authController
