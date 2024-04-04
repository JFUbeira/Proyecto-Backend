import { generateProduct } from '../utils/utils.js'

export const getProducts = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = 10;
        const totalPages = Math.ceil(100 / pageSize);

        if (page < 1 || page > totalPages) {
            return res.status(400).send({ error: 'Invalid page number' });
        }

        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        let products = [];
        for (let i = startIndex; i < endIndex; i++) {
            if (i >= 100) break;
            products.push(generateProduct());
        }

        res.send({
            status: 'success',
            page: page,
            totalPages: totalPages,
            pageSize: pageSize,
            totalProducts: 100,
            products: products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: 'Could not get products' });
    }
};