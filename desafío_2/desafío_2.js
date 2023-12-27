const fs = require('fs').promises

class ProductManager {
    constructor() {
        this.path = './products.json'
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
}

run()
