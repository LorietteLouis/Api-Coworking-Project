const express = require('express')
const router = express.Router()
const coworkingController = require('../controllers/coworkingControllers')
const authController = require('../controllers/authController')

router
        .route('/')
        .get(coworkingController.findAllCoworking)
        .post(authController.protect, coworkingController.createdCoworking)

router
        .route('/:id')
        .get(coworkingController.findCoworkingByPk)
        .put(authController.protect, coworkingController.updatedCoworking)
        .delete(authController.protect, coworkingController.deletedCoworking)


module.exports = router