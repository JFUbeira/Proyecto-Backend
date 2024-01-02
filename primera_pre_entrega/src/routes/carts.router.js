import { Router } from "express"
import CartManager from "../cartManager.js"

const router = Router()

router.post("/", (req, res) => {
    const cartManager = new CartManager()
    cartManager.createCart()
        .then(cart => {
            res.json(cart)
        })
        .catch(error => {
            console.log(error)
        })
})

router.get("/:cid", (req, res) => {
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

router.post("/:cid/product/:pid", async (req, res) => {
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
});

export default router