import { Router } from "express"
import ProductManager from "../productManager.js"

const router = Router()

router.get('/', (req, res) => {
    const limit = req.query.limit
    const productManager = new ProductManager()
    productManager.getProducts()
        .then(products => {
            const limitedProducts = products.slice(0, limit)
            res.render('home', { products: limitedProducts })
        })

})

export default router