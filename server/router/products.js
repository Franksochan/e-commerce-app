const express = require('express')
const router = express.Router()

const {
  getAllProducts,
  getUserCartItems,
  addToCart,
  deleteFromCart,
  updateCartItem
} = require('../controller/products')


router.get('/', getAllProducts)

router.get('/cart/:userID',  getUserCartItems)

router.post('/cart', addToCart)

router.delete('/cart/:userID/:cartItemID', deleteFromCart)

router.put('/cart/:userID/:cartItemID', updateCartItem)

module.exports = router 