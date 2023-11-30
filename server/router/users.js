const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const multer = require('multer')
const path = require('path')

const {
  registerUser,
  logIn,
  getUserData,
  editProfile,
  changeUsername,
  changePassword,
  uploadProfilePic,
  getProfilePic
} = require('../controller/users')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send("Unauthorized: Missing or invalid token")
  }

  const token = authHeader.split(' ')[1]
  const secretKey = process.env.SECRET_KEY

  if (!secretKey) {
    console.error("Missing secret key")
    return res.status(500).send("Internal Server Error")
  }

  jwt.verify(token, secretKey, (err) => {
    if (err) {
      console.error(err)
      return res.status(403).send("Forbidden: Token verification failed")
    }
    next()
  })
}

router.post('/register', registerUser)

router.post('/login', logIn)

router.get('/profile/:userID', verifyToken, getUserData)

router.put('/profile/:userID', verifyToken, editProfile)

router.put('/profile/username/:userID', verifyToken, changeUsername)

router.put('/profile/password/:userID', verifyToken, changePassword)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

router.post('/upload/:userID', upload.single('profilePic'), verifyToken, uploadProfilePic)

router.get('/image/:userID', verifyToken, getProfilePic)

module.exports = router