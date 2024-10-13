const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		balance: {
			type: Number,
			default: 0,
		},
		note: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', userSchema)
