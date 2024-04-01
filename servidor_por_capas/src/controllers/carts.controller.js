import CartService from "../services/dao/mongoManagers/MDBcartManager.js"

const cartService = new CartService()

export const createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart()
        res.json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const updateCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const updatedCart = req.body
        await cartService.updateCart(cid, updatedCart)
        res.json({ status: 'success', message: 'Cart updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const updateProductQuantity = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity
        await cartService.updateProductQuantity(cid, pid, quantity)
        res.json({ status: 'success', message: 'Product quantity updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const getCartById = async (req, res) => {
    try {
        const cid = req.params.cid
        const populatedCart = await cartService.getPopulatedCart(cid)
        res.json(populatedCart)
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        await cartService.addProductToCart(cid, pid)
        res.json({ status: 'success', message: 'Product added successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        await cartService.deleteProductFromCart(cid, pid)
        res.json({ status: 'success', message: 'Product deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cid = req.params.cid
        await cartService.deleteCart(cid)
        res.json({ status: 'success', message: 'Cart deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const getPopulatedCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const populatedCart = await cartService.getPopulatedCart(cid)
        res.json(populatedCart)
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}
