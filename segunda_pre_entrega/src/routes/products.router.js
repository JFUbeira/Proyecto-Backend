import { Router } from "express"
import ProductManager from "../dao/mongoManagers/MDBproductManager.js"
import { productModel } from "../dao/models/product.model.js"

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    const { page, limit, sort } = req.query

    try {
        const sortConfig = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined

        const products = await productModel.paginate({}, {
            page: page || 1,
            limit: limit || 10,
            sort: sortConfig,
        })

        const response = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.prevPage : null,
            nextPage: products.hasNextPage ? products.nextPage : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit || 10}&sort=${sort || ''}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit || 10}&sort=${sort || ''}` : null,
        }

        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        const product = await productManager.getProductById(pid)

        if (!product) {
            res.json({ error: 'Product not found' })
        } else {
            res.json(product)
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const product = req.body
        await productManager.addProduct(product)
        res.json({ status: 'success', message: 'Product added successfully' })
    } catch (error) {
        console.log(error)
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        const updatedProduct = req.body
        await productManager.updateProduct(pid, updatedProduct)
        res.json({ status: 'success', message: 'Product updated successfully' })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        await productManager.deleteProduct(pid)
        res.json({ status: 'success', message: 'Product deleted successfully' })
    } catch (error) {
        console.log(error)
    }
})

export default router

// router.get('/:pid', (req, res) => {
//     const pid = req.params.pid
//     productManager.getProductById(pid)
//         .then(product => {
//             if (!product) {
//                 res.json({ error: 'Product not found' })
//             } else {
//                 res.json(product)
//             }
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// router.post('/', (req, res) => {
//     const product = req.body
//     productManager.addProduct(product)
//         .then(() => {
//             res.json({ status: 'success', message: 'Product added successfully' })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// router.put('/:pid', (req, res) => {
//     const pid = req.params.pid
//     const updatedProduct = req.body
//     productManager.updateProduct(pid, updatedProduct)
//         .then(() => {
//             res.json({ status: 'success', message: 'Product updated successfully' })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// router.delete('/:pid', (req, res) => {
//     const pid = req.params.pid
//     productManager.deleteProduct(pid)
//         .then(() => {
//             res.json({ status: 'success', message: 'Product deleted successfully' })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })