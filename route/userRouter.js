const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router
        .route('/')
        .get(userController.findAllUser)

router
        .route('/signup')
        .post(authController.signUp)

router
        .route('/login')
        .post(authController.logIn)

router
        .route('/:id')
        .get(userController.findUserByPk)
        .put(authController.protect, userController.updatedUser)
        .delete(authController.protect, userController.deletedUser)


module.exports = router