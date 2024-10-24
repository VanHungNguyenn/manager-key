const User = require('@/models/userModel')
const Transaction = require('@/models/transactionModel')
const { typeTransactionEnum } = require('@/types')
const { pagination } = require('@/utils')

const transactionController = {
	createTransaction: async (req, res) => {
		const session = await mongoose.startSession() // Bắt đầu phiên giao dịch
		session.startTransaction() // Bắt đầu transaction

		try {
			const { id: userId } = req.params

			const {
				bankName,
				amount,
				bankAccountNumber,
				fromAccountNumber,
				fromBankName,
				content,
				mailId,
				mailDate,
				shortCode,
			} = req.body

			if (isNaN(amount)) {
				return res
					.status(400)
					.json({ message: 'Amount must be a number' })
			}

			const user = await User.findById(userId).session(session) // Tìm user trong transaction

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			// Cập nhật số dư của người dùng trong transaction
			await User.findByIdAndUpdate(
				userId,
				{
					$inc: {
						balance: Math.round(Number(amount) * 100) / 100,
					},
				},
				{ new: true, session } // Thêm session vào cập nhật
			)

			// Tạo giao dịch
			const transaction = new Transaction({
				userId,
				type: typeTransactionEnum.AUTO,
				bankName,
				amount,
				bankAccountNumber,
				fromAccountNumber,
				fromBankName,
				content,
				mailId,
				mailDate,
				shortCode,
			})

			await transaction.save({ session }) // Lưu giao dịch trong transaction

			await session.commitTransaction() // Cam kết transaction
			session.endSession() // Kết thúc session

			return res.status(201).json({
				message: 'Create transaction successfully',
				transaction,
			})
		} catch (error) {
			await session.abortTransaction() // Hủy transaction nếu có lỗi
			session.endSession() // Kết thúc session

			return res.status(500).json({ message: error.message })
		}
	},
	getAllTransactions: async (req, res) => {
		try {
			const { search } = req.query

			const conditions = {}
			const populateFields = [{ path: 'userId', select: 'username' }]

			if (search) {
				// Tìm kiếm không phân biệt hoa thường
				const userIds = await User.find({
					username: { $regex: search, $options: 'i' }, // Tìm kiếm theo username
				})
					.select('_id') // Chỉ lấy _id của những user phù hợp
					.then((users) => users.map((user) => user._id)) // Chuyển đổi thành mảng _id

				// Tìm theo cả userId (dựa trên username) và content
				conditions['$or'] = [
					{ userId: { $in: userIds } }, // Tìm theo userId
					{ content: { $regex: search, $options: 'i' } }, // Tìm theo content
				]
			}

			const results = await pagination(
				Transaction,
				req.query,
				conditions,
				'',
				populateFields
			)

			return res.status(200).json({
				message: 'Get all transactions successfully',
				total: results.total,
				transactions: results.results || [],
			})
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
	deleteTransaction: async (req, res) => {
		try {
			const { transactionId } = req.params

			const transaction = await Transaction.findByIdAndDelete(
				transactionId
			)

			if (!transaction) {
				return res
					.status(404)
					.json({ message: 'Transaction not found' })
			}

			return res
				.status(200)
				.json({ message: 'Delete transaction successfully' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	},
}

module.exports = transactionController
