const router = require('express').Router()
const userController = require('@/controllers/userController')
const checkAuth = require('@/middlewares/checkAuth')
const checkAdmin = require('@/middlewares/checkAdmin')

// user
router.get('/profile', checkAuth, userController.getProfileUser)
router.put('/change-password', checkAuth, userController.changePassword)
// admin
router.post('/create', checkAuth, checkAdmin, userController.createUser)
router.get('/all', checkAuth, checkAdmin, userController.getAllUsers)
router.put('/update/:id', checkAuth, checkAdmin, userController.updateUser)
router.delete('/delete/:id', checkAuth, checkAdmin, userController.deleteUser)

module.exports = router
