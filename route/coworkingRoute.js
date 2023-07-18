const express = require('express')
const router = express.Router()
const coworkingController = require('../controllers/coworkingControllers')

router
        .route('/')
        .get(coworkingController.findAllCoworking)
        .post(coworkingController.findCoworkingByPk)

router
        .route('/:id')
        .get(coworkingController.createdCoworking)
        .put(coworkingController.updatedCoworking)
        .delete(coworkingController.deletedCoworking)


module.exports = router