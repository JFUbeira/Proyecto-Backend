// const fs = require('fs')

// class ProductManager {
//     constructor() {
//         this.products = []
//         this.path = './products.json'
//     }

//     addProduct(title, description, price, thumbnail, code, stock) {
//         if (!title || !description || !price || !thumbnail || !code || !stock) {
//             console.log('Error: Todos los campos son obligatorios')
//         } else if (this.products.find((product) => product.code === code)) {
//             console.log('Error: El código del producto ya existe')
//         } else {
//             const newProduct = new Product(
//                 title,
//                 description,
//                 price,
//                 thumbnail,
//                 code,
//                 stock
//             )
//             newProduct.id = this.products.length + 1
//             this.products.push(newProduct)
//             try {
//                 const data = JSON.stringify(this.products)
//                 fs.writeFileSync(this.path, data)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }
//     getProducts(callback) {
//         fs.readFile(this.path, 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 const products = JSON.parse(data)
//                 callback(products) // Llama al callback con los productos
//             }
//         })
//     }

//     getProductById(id) {
//         fs.readFile(this.path, 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 const products = JSON.parse(data)
//                 const product = products.find((product) => product.id === id)
//                 console.log(product)
//             }
//         })
//     }

//     updateProduct(id, updatedProduct) {
//         fs.readFile(this.path, 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 const products = JSON.parse(data)
//                 const product = products.find((product) => product.id === id)
//                 if (!product) {
//                     console.log('Error: El producto no existe')
//                 } else {
//                     products.splice(
//                         products.indexOf(product),
//                         1,
//                         updatedProduct
//                     )
//                 }
//             }
//         })
//     }

//     deleteProduct(id) {
//         fs.readFile(this.path, 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 const products = JSON.parse(data)
//                 const product = products.find((product) => product.id === id)
//                 if (!product) {
//                     console.log('Error: El producto no existe')
//                 } else {
//                     products.splice(products.indexOf(product), 1)
//                 }
//             }
//         })
//     }
// }

// class Product {
//     constructor(title, description, price, thumbnail, code, stock) {
//         this.title = title
//         this.description = description
//         this.price = price
//         this.thumbnail = thumbnail
//         this.code = code
//         this.stock = stock
//     }
// }

// const productManager = new ProductManager()

// productManager.getProducts((products) => {
//     console.log(products)
// })

// productManager.addProduct(
//     'producto prueba',
//     'Este es un producto prueba',
//     200,
//     'Sin imagen',
//     'abc123',
//     25
// )

// productManager.getProducts((products) => {
//     console.log(products)
// })

// productManager.addProduct(
//     'producto prueba',
//     'Este es un producto prueba',
//     200,
//     'Sin imagen',
//     'otro_codigo',
//     25
// )

// productManager.getProductById(1)
// productManager.getProductById(2)
// productManager.getProductById(3)

// productManager.updateProduct(2, {
//     title: 'PRODUCTO ACTUALIZADO',
//     description: 'Este es un producto prueba',
//     price: 200,
//     thumbnail: 'Sin imagen',
//     code: 'otro_codigo',
//     stock: 25,
// })

// console.log(productManager.getProducts())

// productManager.deleteProduct(1)
// productManager.deleteProduct(3)

// console.log(productManager.getProducts())
