const Product = require('../models/products')

const updateProductStock = async (selectedItems) => {
  try {
    for (const item of selectedItems) {
      const product = await Product.findById(item.productID);

      if (!product) {
        console.error(`Product not found for ID: ${item.productID}`)
        continue
      }

      product.productQuantity -= item.quantity

      await product.save()
  }} catch (err) {
     console.log(err)
  }
}

module.exports = updateProductStock