import { Router } from "express"
import { createCart, updateCart, updateProductQuantity, getPopulatedCart, addProductToCart, deleteProductFromCart, deleteCart } from "../controllers/carts.controller.js"

const router = Router()

router.post("/", createCart)
router.put("/:cid", updateCart)
router.put("/:cid/product/:pid", updateProductQuantity)
router.get("/:cid", getPopulatedCart)
router.post("/:cid/product/:pid", addProductToCart)
router.delete("/:cid/product/:pid", deleteProductFromCart)
router.delete("/:cid", deleteCart)

export default router