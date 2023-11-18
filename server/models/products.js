const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema ({
  productName: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  imgURL: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('products', ProductSchema)