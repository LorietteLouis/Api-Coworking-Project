const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
        .route('/')
        .get(userController.findAllUser)
        .post(userController.createdUser)

router
        .route('/:id')
        .get(userController.findUserByPk)
        .put(userController.updatedUser)
        .delete(userController.deletedUser)


module.exports = router