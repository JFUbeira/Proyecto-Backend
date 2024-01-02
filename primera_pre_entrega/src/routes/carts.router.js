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

export default router