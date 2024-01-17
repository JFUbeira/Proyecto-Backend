import { Router } from "express"
import CartManager from "../dao/mongoManagers/MDBcartManager.js"

const router = Router()
const cartManager = new CartManager()

router.post("/", (req, res) => {
    cartManager.createCart()
        .then(cart => {
            res.json(cart)
        })
        .catch(error => {
            console.log(error)
        })
})

router.put("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid
        const updatedCart = req.body
        await cartManager.updateCart(cid, updatedCart)
        res.json({ status: 'success', message: 'Cart updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
})

router.put("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    try {
        const validation = await cartManager.checkIfProductExists(pid);
        if (validation) {
            await cartManager.updateProductQuantity(cid, pid, quantity);
            res.json({ status: 'success', message: 'Product quantity updated successfully' });
        } else {
            res.json({ status: 'error', message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

router.get("/:cid", (req, res) => {
    const cid = req.params.cid
    cartManager.getCartProducts(cid)
        .then(products => {
            res.json(products)
        })
        .catch(error => {
            console.log(error)
        })
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    try {
        const validation = await cartManager.checkIfProductExists(pid);

        if (validation) {
            await cartManager.addProductToCart(cid, pid);
            res.json({ status: 'success', message: 'Product added successfully' });
        } else {
            res.json({ status: 'error', message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});


router.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    try {
        const validation = await cartManager.checkIfProductExists(pid)
        if (validation) {
            await cartManager.deleteProductFromCart(cid, pid)
            res.json({ status: 'success', message: 'Product deleted successfully' })
        } else {
            res.json({ status: 'error', message: 'Product not found' })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;

    try {
        await cartManager.deleteCart(cid);
        res.json({ status: 'success', message: 'Cart deleted successfully' });
    } catch (error) {
        console.log(error);
    }
});

export default router