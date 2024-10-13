const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		bankName: {
			type: String,
			required: true,
		},
		bankAccountNumber: {
			type: String,
			required: true,
		},
		fromAccountNumber: {
			type: String,
			required: true,
		},
		fromBankName: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		content: {
			type: String,
			required: true,
		},
		mailId: {
			type: String,
			required: true,
		},
		mailDate: {
			type: Date,
			required: true,
		},
		shortCode: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Transaction', transactionSchema)
