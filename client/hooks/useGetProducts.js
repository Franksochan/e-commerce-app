import { useState, useEffect } from "react"
import axios from 'axios'

export const getProducts = () => {
  const [ products, setProducts ] = useState([{}])

  const fetchProducts = async () => {
    try{
      const fetchedProducts = await axios.get('https://johnlino-ecommerce-app.onrender.com/products')
      setProducts(fetchedProducts.data.products)
      console.log(fetchedProducts.data.products)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products }
}
