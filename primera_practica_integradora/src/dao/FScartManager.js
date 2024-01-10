import { promises as fs } from 'fs'
import ProductManager from './FSproductManager.js'

class CartManager {
    constructor() {
        this.path = './data/carts.json'
    }

    async readCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return (error)
        }
    }

    async writeCarts(carts) {
        const data = JSON.stringify(carts)
        await fs.writeFile(this.path, data)
    }

    async getCarts() {
        try {
            const carts = await this.readCarts()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async createCart() {
        const cart = new Cart()
        const carts = await this.getCarts()
        cart.id = carts.length + 1
        carts.push(cart)
        await this.writeCarts(carts)
        return cart
    }

    async getCartProducts(id) {
        try {
            const carts = await this.readCarts()
            const cart = carts.find(cart => cart.id == id)
            if (!cart) {
                console.log('Error: El carrito no existe')
            } else {
                return cart.products
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const carts = await this.readCarts()
            const cart = carts.find((cart) => cart.id == cid)

            if (!cart) {
                console.log('Error: El carrito no existe')
            } else {
                const productExists = cart.products.find((product) => product.product === pid)

                if (productExists) {
                    productExists.quantity++
                } else {
                    cart.products.push({ product: pid, quantity: 1 })
                }

                await this.writeCarts(carts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async checkIfProductExists(pid) {
        try {
            const productManager = new ProductManager();
            const products = await productManager.readProducts();
            const productIndex = products.findIndex((product) => product.id === Number(pid));

            if (productIndex === -1) {
                console.log('Error: El producto no existe');
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

class Cart {
    constructor(products) {
        this.products = []
    }
}

export default CartManager