const router = require('express').Router()
const transactionController = require('@/controllers/transactionController')
const checkAuth = require('@/middlewares/checkAuth')
const checkAdmin = require('@/middlewares/checkAdmin')

// admin
router.post(
	'/create/:id',
	checkAuth,
	checkAdmin,
	transactionController.createTransaction
)
router.get(
	'/all',
	checkAuth,
	checkAdmin,
	transactionController.getAllTransactions
)
router.delete(
	'/delete/:transactionId',
	checkAuth,
	checkAdmin,
	transactionController.deleteTransaction
)

module.exports = router
