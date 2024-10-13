const router = require('express').Router()

const authRouter = require('@/routes/authRouter')
const userRouter = require('@/routes/userRouter')

router.use('/api/auth', authRouter)
router.use('/api/user', userRouter)

module.exports = router
