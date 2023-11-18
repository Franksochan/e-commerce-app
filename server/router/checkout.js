const express = require('express')
const router = express.Router()
const purchasedItem = require('../controller/checkout')

router.post('/:userID', purchasedItem)


module.exports = router
