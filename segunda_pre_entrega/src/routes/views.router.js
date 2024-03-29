import { Router } from "express"

const router = Router()

router.get('/chat', (req, res) => {
    res.render("chat", {})
})

export default router

// const productManager = new ProductManager()
// const cartManager = new CartManager()

// router.get('/api/products', async (req, res) => {
//     const { page, limit, sort } = req.query;

//     try {
//         const sortConfig = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined;

//         const products = await productModel.paginate({}, {
//             page: page || 1,
//             limit: limit || 10,
//             sort: sortConfig,
//         });

//         const response = {
//             status: 'success',
//             payload: products.docs,
//             totalPages: products.totalPages,
//             prevPage: products.hasPrevPage ? products.prevPage : null,
//             nextPage: products.hasNextPage ? products.nextPage : null,
//             page: products.page,
//             hasPrevPage: products.hasPrevPage,
//             hasNextPage: products.hasNextPage,
//             prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit || 10}&sort=${sort || ''}` : null,
//             nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit || 10}&sort=${sort || ''}` : null,
//         };

//         res.json(response);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             status: 'error',
//             message: 'Internal Server Error',
//         });
//     }
// });

// router.get('/api/products/:pid', (req, res) => {
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

// router.post('/api/products', (req, res) => {
//     const product = req.body
//     productManager.addProduct(product)
//         .then(() => {
//             res.json({ status: 'success', message: 'Product added successfully' })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// router.put('/api/products/:pid', (req, res) => {
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

// router.delete('/api/products/:pid', (req, res) => {
//     const pid = req.params.pid
//     productManager.deleteProduct(pid)
//         .then(() => {
//             res.json({ status: 'success', message: 'Product deleted successfully' })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// router.post("/api/carts", (req, res) => {
//     cartManager.createCart()
//         .then(cart => {
//             res.json(cart)
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// router.put("/api/carts/:cid", async (req, res) => {
//     try {
//         const cid = req.params.cid
//         const updatedCart = req.body
//         await cartManager.updateCart(cid, updatedCart) // Añade 'await' aquí
//         res.json({ status: 'success', message: 'Cart updated successfully' })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ status: 'error', message: 'Internal Server Error' })
//     }
// })

// router.put("/api/carts/:cid/product/:pid", async (req, res) => {
//     const cid = req.params.cid;
//     const pid = req.params.pid;
//     const quantity = req.body.quantity;
//     try {
//         const validation = await cartManager.checkIfProductExists(pid);
//         if (validation) {
//             await cartManager.updateProductQuantity(cid, pid, quantity);
//             res.json({ status: 'success', message: 'Product quantity updated successfully' });
//         } else {
//             res.json({ status: 'error', message: 'Product not found' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//     }
// });

// router.get("/api/carts/:cid", (req, res) => {
//     const cid = req.params.cid
//     cartManager.getCartProducts(cid)
//         .then(products => {
//             res.json(products)
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// router.post("/api/carts/:cid/product/:pid", async (req, res) => {
//     const cid = req.params.cid;
//     const pid = req.params.pid;

//     try {
//         const validation = await cartManager.checkIfProductExists(pid);

//         if (validation) {
//             await cartManager.addProductToCart(cid, pid);
//             res.json({ status: 'success', message: 'Product added successfully' });
//         } else {
//             res.json({ status: 'error', message: 'Product not found' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//     }
// });


// router.delete("/api/carts/:cid/product/:pid", async (req, res) => {
//     const cid = req.params.cid
//     const pid = req.params.pid

//     try {
//         const validation = await cartManager.checkIfProductExists(pid)
//         if (validation) {
//             await cartManager.deleteProductFromCart(cid, pid)
//             res.json({ status: 'success', message: 'Product deleted successfully' })
//         } else {
//             res.json({ status: 'error', message: 'Product not found' })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })

// router.delete("/api/carts/:cid", async (req, res) => {
//     const cid = req.params.cid;

//     try {
//         await cartManager.deleteCart(cid);
//         res.json({ status: 'success', message: 'Cart deleted successfully' });
//     } catch (error) {
//         console.log(error);
//     }
// });

