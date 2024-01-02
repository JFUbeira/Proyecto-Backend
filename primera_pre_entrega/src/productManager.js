import { promises as fs } from 'fs'

class ProductManager {
    constructor() {
        this.path = './data/products.json'
    }

    async readProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return (error)
        }
    }

    async writeProducts(products) {
        const data = JSON.stringify(products)
        await fs.writeFile(this.path, data)
    }
    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, code, stock, category } = product;
            const products = await this.readProducts();

            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                console.log('Error: Todos los campos son obligatorios');
            } else if (products.find((product) => product.code === code)) {
                console.log('Error: El código del producto ya existe');
            } else {
                const newProduct = new Product(title, description, price, thumbnail, code, stock, category);
                const lastProduct = products[products.length - 1];
                newProduct.id = lastProduct ? lastProduct.id + 1 : 1;
                products.push(newProduct);
                await this.writeProducts(products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            const products = await this.readProducts()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const products = await this.readProducts()
            const product = products.find((product) => product.id == id)
            if (!product) {
                console.log('Error: El producto no existe')
            } else {
                return product
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
    constructor(title, description, price, thumbnail, code, stock, category) {
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.category = category
        this.stock = stock
        this.thumbnail = thumbnail
        this.status = true
    }
}

export default ProductManager