import express from 'express'
import ProductManager from './productManager.js'

const app = express()
const port = 8080

app.get('/products', (req, res) => {
    const limit = req.query.limit

    if (!limit) {
        const productManager = new ProductManager()
        productManager.getProducts()
            .then(products => {
                res.json(products)
            })
    }

    else {
        const productManager = new ProductManager()
        productManager.getProducts()
            .then(products => {
                const limitedProducts = products.slice(0, limit)
                res.json(limitedProducts)
            })
    }
})

app.get('/products/:pid', (req, res) => {
    const pid = req.params.pid
    const productManager = new ProductManager()
    productManager.getProductById(pid)
        .then(product => {
            res.json(product)
        })
})

app.listen(port)