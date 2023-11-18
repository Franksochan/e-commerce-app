const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [20, 'Username must not be more than 20 characters'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: [18,  'First Name cant be more than 18 characters']
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [18, 'Last Name cant be more than 18 characters']
  },
  address: {
    type: String,
    requires: true
  },
  contactNum: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  wallet: {
    type: Number,
    default: 30000
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: {
        type: Number,
        required: true,
      },
      imgURL: {
        type: String,
        required: true
      }, 
      productName: {
        type: String,
        required: true,
      },
    }
  ], 
  purchasedItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: {
        type: Number,
        required: true,
      },
      imgURL: {
        type: String,
        required: true
      }, 
      productName: {
        type: String,
        required: true,
      },
    }
  ]
});

module.exports = mongoose.model('users', UserSchema);
