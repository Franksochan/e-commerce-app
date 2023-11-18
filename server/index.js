const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const cors = require('cors')
require('dotenv').config()
const users = require('./router/users')
const products = require('./router/products')
const checkout = require('./router/checkout')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('uploads'))

const port = process.env.PORT || 5000

app.use('/users', users)
app.use('/products', products)
app.use('/checkout', checkout)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is now listening on port ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
