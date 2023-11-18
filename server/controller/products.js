const Product = require('../models/products')
const User = require('../models/user')
const updateCartItemPrices = require('../utils/update-cart-items')

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    if (!products) {
      res.status(404).send({ msg: 'Products not found '})
    }
    res.status(200).send({products})
  } catch (err) {
    console.log(err)
  }
}

const getUserCartItems = async (req, res) => {
  try {
    const { userID } = req.params
    const user = await User.findById(userID)

    if (!user) {
      res.status(404).send({msg: 'User not found'})
    }
    const cartItems = user.cartItems
    updateCartItemPrices()
    res.status(200).json(cartItems)
  } catch (err) {
    console.log(err)
  }
}

const addToCart = async (req, res) => {
  try {
    const { productID, userID } = req.body
    const user = await User.findById(userID)

    if (!user) {
      return res.status(404).send({ msg: 'User not found' })
    }

    const product = await Product.findById(productID)

    if (!product) {
      return res.status(404).send({ msg: 'Product not found' })
    }

    const cartItem = user.cartItems.find((item) => item.product.toString() === productID)

    if (cartItem) {
      if (cartItem.quantity >= product.productQuantity) {
        return res.status(204).json({ msg: 'Not enough stock' })
      }

      cartItem.quantity += 1
      cartItem.price = product.price * cartItem.quantity
    } else {
      if (product.productQuantity > 0) {
        user.cartItems.push({
          product: productID,
          quantity: 1,
          price: product.price,
          imgURL: product.imgURL,
          productName: product.productName,
        });
      } else {
        return res.status(204).send({ msg: 'Not enough stock' })
      }
    }

    await user.save()
    res.status(200).send({ msg: 'Product has been added to the cart successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: `An error has occurred: ${err}` })
  }
}

const deleteFromCart = async (req, res) => {
  try {
    const { userID, cartItemID } = req.params
    const user = await User.findById(userID)

    if (!user) {
      return res.status(404).send({ msg: 'User not found' })
    }

    const itemToBeRemoved = user.cartItems.find(item => item._id.toString() === cartItemID)

    if(itemToBeRemoved  && itemToBeRemoved.quantity > 1) {
      itemToBeRemoved.quantity -= 1
    } else {
      user.cartItems = user.cartItems.filter(item => item._id.toString() !== cartItemID)
    }

    await user.save();
    res.status(200).send({ msg: 'Removed from cart successfully' })
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: `An error has occurred: ${err}` })
  }
}

const updateCartItem = async (req, res) => {
  try {
    const { userID, cartItemID } = req.params
    const { quantity, price } = req.body
  
    const user = await User.findById(userID)

    if (!user) {
      return res.status(404).send({ msg: 'User not found' })
    }

    const cartItem = user.cartItems.find((item) => item._id.toString() === cartItemID)

    if (!cartItem) {
      return res.status(404).send({ msg: 'Cart item not found' })
    }

    cartItem.quantity = quantity
    cartItem.price = price
    
    await user.save()

    res.status(200).send({ msg: 'Cart item quantity updated successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: `An error has occurred: ${err}` })
  }
}

module.exports = {
  getAllProducts,
  getUserCartItems,
  addToCart,
  deleteFromCart,
  updateCartItem
}