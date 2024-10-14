const mongoose = require('mongoose')
const { typeTransactionEnum } = require('@/types')

const transactionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		type: {
			type: String,
			enum: Object.values(typeTransactionEnum),
			required: true,
		},
		bankName: {
			type: String,
			default: '',
		},
		amount: {
			type: Number,
			required: true,
		},
		bankAccountNumber: {
			type: String,
			default: '',
		},
		fromAccountNumber: {
			type: String,
			default: '',
		},
		fromBankName: {
			type: String,
			default: '',
		},
		content: {
			type: String,
			default: '',
		},
		mailId: {
			type: String,
			default: '',
		},
		mailDate: {
			type: Date,
		},
		shortCode: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Transaction', transactionSchema)
