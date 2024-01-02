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

export default router