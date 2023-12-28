const fs = require('fs').promises

class ProductManager {
    constructor() {
        this.path = './products.json'
    }

    async readProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    async writeProducts(products) {
        const data = JSON.stringify(products)
        await fs.writeFile(this.path, data)
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.readProducts()
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log('Error: Todos los campos son obligatorios')
            }

            else if (products.find((product) => product.code === code)) {
                console.log('Error: El código del producto ya existe')
            }

            else {
                const newProduct = new Product(title, description, price, thumbnail, code, stock)
                newProduct.id = products.length + 1
                products.push(newProduct)
                await this.writeProducts(products)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        try {
            const products = await this.readProducts()
            console.log(products)
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const products = await this.readProducts()
            const product = products.find((product) => product.id === id)
            if (!product) {
                console.log('Error: El producto no existe')
            } else {
                console.log(product)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.readProducts();
            const productIndex = products.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                console.log('Error: El producto no existe');
            } else {
                const updatedProductWithId = { ...updatedProduct, id: products[productIndex].id };
                products.splice(productIndex, 1, updatedProductWithId);
                await this.writeProducts(products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.readProducts()
            const product = products.find((product) => product.id === id)
            if (!product) {
                console.log('Error: El producto no existe')
            } else {
                products.splice(products.indexOf(product), 1)
                await this.writeProducts(products)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

async function run() {
    const productManager = new ProductManager()

    await productManager.getProducts()

    await productManager.addProduct(
        'producto prueba',
        'Este es un producto prueba',
        200,
        'Sin imagen',
        'abc123',
        25
    )

    await productManager.getProducts()

    await productManager.getProductById(2)
    await productManager.getProductById(1)

    await productManager.addProduct(
        'producto prueba 2',
        'Este es un producto prueba 2',
        500,
        'Sin imagen',
        'otro-codigo',
        50
    )

    await productManager.getProducts()

    await productManager.updateProduct(1, {
        title: 'producto prueba actualizado',
        description: 'Este es un producto prueba actualizado',
        price: 300,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    })

    await productManager.getProducts()

    await productManager.deleteProduct(3)
    await productManager.deleteProduct(1)

    await productManager.getProducts()
}

run()
