import { generateProduct } from '../utils/utils.js'

export const getProducts = async (req, res) => {
    try {
        let products = []
        for (let i = 0; i < 5; i++) {
            products.push(generateProduct())
        }
        res.send({ status: "success", payload: products })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error, message: "Coult not get products" })
    }
};