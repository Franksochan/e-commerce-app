const User = require('../models/user')
const Product = require('../models/products')

const updateCartItemPrices = async () => {
  const users = await User.find({});

  for (const user of users) {
    for (const cartItem of user.cartItems) {
      const product = await Product.findById(cartItem.product);

      if (product) {
        cartItem.price = product.price * cartItem.quantity;
      }
    }
    await user.save();
  }
}

module.exports = updateCartItemPrices
