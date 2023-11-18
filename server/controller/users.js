const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
  try {
    const { username, password, firstName, lastName, address, contactNum } = req.body
    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ 
      username, 
      password: hashedPassword, 
      firstName, 
      lastName, 
      address, 
      contactNum })
    await newUser.save()
    
    res.status(201).json({ msg: 'User is registered'})
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err })
  }
}

const logIn = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ msg: 'User not found' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return  res.status(400).json({ msg: 'Incorrect Password'})
    }
    const token = jwt.sign({ id: user._id}, process.env.SECRET_KEY)
    res.json({ token, userID: user._id})
  } catch (err) {
    res.status(500).json({ msg: err })
  }
}

const getUserData = async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const userData = {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      contactNum: user.contactNum,
      money: user.wallet,
      cartItems: user.cartItems,
      purchasedItems: user.purchasedItems
    };

    res.status(200).json({ user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
}

const editProfile = async (req, res) => {
  try {
    const { userID } = req.params
    const { firstName, lastName, address, contactNum } = req.body

    const user = await User.findById(userID)

    if (!user) {
      res.status(404).send({ msg: 'User not found '})
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.contactNum = contactNum || user.contactNum;
  
    res.status(200).send({ msg: 'Profile changed succesfully' })
    await user.save();

  } catch (err) {
    console.log(err)
  }
}

const changeUsername = async (req, res) => {
  try {
    const { userID } = req.params
    const { username, oldUsername } = req.body

    const user = await User.findById(userID)

    if (!user) {
      return res.status(404).send({ msg: 'User not found '})
    }

    if (user.username !== oldUsername) {
      return res.status(200).send({ msg: 'Incorrect old username, please try again'})
    }

    const existingUsername = await User.findOne({ username })

    if (existingUsername) {
      return res.status(200).send({ msg: 'Username already exists'})
    }
    user.username = username 

    res.status(200).send({ msg: 'Profile changed succesfully' })

    await user.save()
  } catch (err) {
    console.log(err)
  }
}

const changePassword = async (req, res) => {
  try {
    const { userID } = req.params
    const { password, oldPassword } = req.body

    const user = await User.findById(userID)

    if (!user) {
      return res.status(404).send({ msg: 'User not found '})
    }
    
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if (!isPasswordValid) {
      return res.status(200).send({ msg: 'Incorrect old password, please try again' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
  
    res.status(200).send({ msg: 'Password changed succesfully' })

    await user.save()
  } catch (err) {
    console.log(err)
  }
}

const uploadProfilePic = async (req, res) => {
  try {
    const { userID } = req.params

    const user = await User.findById(userID)

    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    console.log('req.file:', req.file);

    const profilePic = req.file ? req.file.filename : ''
    user.profilePic = profilePic
    console.log('profilePic:', profilePic);

    await user.save()

    res.status(200).json({ profilePic: user.profilePic })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err })
  }
}

const getProfilePic = async (req, res) => {
  try { 
    const { userID } = req.params

    const user = await User.findById(userID)

    if (!user) {
      return res.status(400).send({ msg: 'User not found' })
    }
    res.status(200).send({ user: user.profilePic })
} catch (err) {
  console.log(err)
}
}

module.exports = {
  registerUser,
  logIn,
  getUserData,
  editProfile,
  changeUsername,
  changePassword,
  uploadProfilePic,
  getProfilePic
}
