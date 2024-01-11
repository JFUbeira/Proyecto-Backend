import { Router } from "express"
import ProductManager from "../dao/MDBproductManager.js"
import CartManager from "../dao/MDBcartManager.js"

const router = Router()

router.get('/api/products', (req, res) => {
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

router.get('/api/products/:pid', (req, res) => {
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

router.post('/api/products', (req, res) => {
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

router.put('/api/products/:pid', (req, res) => {
    const pid = req.params.pid
    const updatedProduct = req.body
    const productManager = new ProductManager()
    productManager.updateProduct(pid, updatedProduct)
        .then(() => {
            res.json({ status: 'success', message: 'Product updated successfully' })
        })
        .catch(error => {
            console.log(error)
        })
})

router.delete('/api/products/:pid', (req, res) => {
    const pid = req.params.pid
    const productManager = new ProductManager()
    productManager.deleteProduct(pid)
        .then(() => {
            res.json({ status: 'success', message: 'Product deleted successfully' })
        })
        .catch(error => {
            console.log(error)
        })
})

router.post("/api/carts", (req, res) => {
    const cartManager = new CartManager()
    cartManager.createCart()
        .then(cart => {
            res.json(cart)
        })
        .catch(error => {
            console.log(error)
        })
})

router.get("/api/carts/:cid", (req, res) => {
    const cid = req.params.cid
    const cartManager = new CartManager()
    cartManager.getCartProducts(cid)
        .then(products => {
            res.json(products)
        })
        .catch(error => {
            console.log(error)
        })
})

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const cartManager = new CartManager()

    try {
        const validation = await cartManager.checkIfProductExists(pid)

        if (validation) {
            await cartManager.addProductToCart(cid, pid);
            res.json({ status: 'success', message: 'Product added successfully' })
        } else {
            res.json({ status: 'error', message: 'Product not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
})

router.get('/chat', (req, res) => {
    res.render("chat", {})
})

export default router