import express from 'express'
import ProductManager from './productManager.js'

const app = express()
const port = 8080

app.get('/products', (req, res) => {
    const productManager = new ProductManager()
    productManager.getProducts()
        .then(products => {
            res.json(products)
        })
})

app.listen(port)