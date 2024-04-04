import ProductsService from "../services/dao/mongoManagers/MDBproducts.dao.js"

const productsService = new ProductsService()

export const getProducts = async (req, res) => {
    try {
        const products = await productsService.getProducts(req, res)
        res.send({ message: "Products list", payload: products })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};


export const getProductById = async (req, res) => {
    try {
        const pid = req.params.pid
        const result = await productsService.getProductById(pid)
        res.status(200).send({ message: 'Product found', payload: result })
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: 'Product not found' })
    }
}

export const addProduct = async (req, res) => {
    try {
        const product = req.body
        const result = await productsService.addProduct(product)
        res.status(201).send({ message: 'Product added successfully', payload: result })
    } catch (error) {
        console.log('There was a problem adding the product', error)
        res.status(500).send({ error: error })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid
        const updatedProduct = req.body
        const result = await productsService.updateProduct(pid, updatedProduct)
        res.status(200).send({ message: 'Product updated successfully', payload: result })
    } catch (error) {
        console.log('There was a problem updating the product', error)
        res.status(500).send({ error: error })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid
        const result = await productsService.deleteProduct(pid)
        res.status(200).send({ message: 'Product deleted successfully', payload: result })
    } catch (error) {
        console.log('There was a problem deleting the product', error)
        res.status(500).send({ error: error })
    }
}