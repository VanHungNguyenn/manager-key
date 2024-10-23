const router = require('express').Router()
const statisticController = require('@/controllers/statisticController')
const checkAuth = require('@/middlewares/checkAuth')
const checkAdmin = require('@/middlewares/checkAdmin')

router.get(
	'/overview',
	checkAuth,
	checkAdmin,
	statisticController.getStatisticOverview
)

module.exports = router
