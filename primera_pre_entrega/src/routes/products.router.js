import { Router } from "express"
import ProductManager from "../productManager.js"

const router = Router()

app.get('/api/products', (req, res) => {
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