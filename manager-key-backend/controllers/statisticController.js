const User = require('@/models/userModel')
const Transaction = require('@/models/transactionModel')

const statisticController = {
	getStatisticOverview: async (req, res) => {
		try {
			const totalUser = await User.countDocuments()
			const totalTransaction = await Transaction.countDocuments()
			// total amount all transaction > 0
			const totalDeposit = await Transaction.aggregate([
				{ $match: { amount: { $gt: 0 } } }, // Chỉ lấy các giao dịch có số tiền lớn hơn 0
				{ $group: { _id: null, total: { $sum: '$amount' } } },
			])

			return res.status(200).json({
				data: {
					totalUser,
					totalTransaction,
					totalDeposit:
						totalDeposit.length > 0 ? totalDeposit[0].total : 0,
				},
			})
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
}

module.exports = statisticController
