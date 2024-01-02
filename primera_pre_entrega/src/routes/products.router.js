import { Router } from "express"
import ProductManager from "../productManager.js"

const router = Router()

router.get('/', (req, res) => {
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

router.get('/:pid', (req, res) => {
    const pid = req.params.pid
    const productManager = new ProductManager()
    productManager.getProductById(pid)
        .then(product => {
            if (!product) {
                res.json({ error: 'Product not found' })
            } else {
                res.json(product)
            }
        })
        .catch(error => {
            console.log(error)
        })
})

router.post('/', (req, res) => {
    const product = req.body
    const productManager = new ProductManager()
    productManager.addProduct(product)
        .then(() => {
            res.json({ status: 'success', message: 'Product added successfully' })
        })
        .catch(error => {
            console.log(error)
        })
})

export default router