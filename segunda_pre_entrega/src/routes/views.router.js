import { Router } from "express"
import ProductManager from "../dao/MDBproductManager.js"
import CartManager from "../dao/MDBcartManager.js"
import { productModel } from "../dao/models/product.model.js"

const router = Router()
const productManager = new ProductManager()

router.get('/api/products', async (req, res) => {
    const { page, limit } = req.query;

    try {
        const products = await productModel.paginate({}, {
            page: page || 1,
            limit: limit || 10,
        });

        const response = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.prevPage : null,
            nextPage: products.hasNextPage ? products.nextPage : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit || 10}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit || 10}` : null,
        };

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
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