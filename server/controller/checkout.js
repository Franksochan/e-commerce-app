const User = require('../models/user')
const Product = require('../models/products')
const updateProductStock = require('../utils/update-product-stock')

const purchasedItem = async (req, res) => {
  try {
    const { userID } = req.params
    const { selectedItems } = req.body
    
    const user = await User.findById(userID)

    if (!user) {
      return res.status(400).json({ msg: 'User not found' })
    }

    await updateProductStock(selectedItems)
    
    for (const item of selectedItems) {
      const product = await Product.findById(item.productID)

      if (!product) {
        res.status(404).json({ msg: 'Item not found '})
      } 

      user.purchasedItems.push({
        product: item.productID,
        quantity: item.quantity,
        price: item.price,
        imgURL: item.imgURL,
        productName: item.productName,
      })

      if (product) {
        user.cartItems = user.cartItems.filter(cartItem => cartItem.product.toString() !== product._id.toString())
      }

      if (user.wallet < item.price) {
        return res.status(200).send({ msg: 'Transaction failed: Insufficient funds'})
      }

      user.wallet -= item.price

      await user.save()
    }

    res.status(200).json({ msg: 'Checkout successful' })
  } catch (error) {
    console.error('Error during checkout:', error)
    res.status(500).json({ msg: 'Internal Server Error' })
  }
}

module.exports = purchasedItem
