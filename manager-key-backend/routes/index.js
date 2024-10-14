const router = require('express').Router()

const authRouter = require('@/routes/authRouter')
const userRouter = require('@/routes/userRouter')
const transactionRouter = require('@/routes/transactionRouter')

router.use('/api/auth', authRouter)
router.use('/api/user', userRouter)
router.use('/api/transaction', transactionRouter)

module.exports = router
