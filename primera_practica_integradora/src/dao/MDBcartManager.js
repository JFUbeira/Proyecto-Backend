import { cartModel } from './cartModel.js';
import ProductManager from './FSproductManager.js';

class CartManager {
    async readCarts() {
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async writeCarts(carts) {
        try {
            await cartModel.deleteMany({}); // Elimina todos los documentos existentes
            await cartModel.insertMany(carts); // Inserta los nuevos carritos
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts() {
        try {
            const carts = await this.readCarts();
            return carts;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async createCart() {
        try {
            const cart = new cartModel();
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartProducts(id) {
        try {
            const cart = await cartModel.findById(id);
            if (!cart) {
                console.log('Error: El carrito no existe');
                return [];
            } else {
                return cart.products;
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);

            if (!cart) {
                console.log('Error: El carrito no existe');
            } else {
                const productIndex = cart.products.findIndex((product) => product.product.equals(pid));

                if (productIndex !== -1) {
                    cart.products[productIndex].quantity++;
                } else {
                    cart.products.push({ product: pid, quantity: 1 });
                }

                await cart.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async checkIfProductExists(pid) {
        try {
            const productManager = new ProductManager();
            const products = await productManager.readProducts();
            return products.some((product) => product.id === Number(pid));
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default CartManager;