import { cartModel } from '../../models/cart.model.js'
import ProductManager from './MDBproducts.dao.js'

class CartManager {
    async readCarts() {
        try {
            const carts = await cartModel.find()
            return carts
        } catch (error) {
            console.log(error)
            return []
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

    async getPopulatedCart(id) {
        try {
            const populatedCart = await cartModel
                .findById(id)
                .populate('products.product')

            return populatedCart;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);

            if (!cart) {
                console.log('Error: El carrito no existe');
            } else {
                const productIndex = cart.products.findIndex((product) => product.product.toString() === pid);

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

    async updateCart(cid, updatedCart) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                console.log('Error: El carrito no existe');
            } else {
                cart.products = updatedCart;
                await cart.save()
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            console.log('New quantity:', quantity)
            const cart = await cartModel.findById(cid);
            if (!cart) {
                console.log('Error: El carrito no existe');
            } else {
                const productIndex = cart.products.findIndex((product) => product.product.toString() === pid);

                if (productIndex !== -1) {
                    cart.products[productIndex].quantity = quantity;
                    cart.markModified('products')
                    await cart.save();
                } else {
                    console.log('Error: El producto no existe en el carrito');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    async checkIfProductExists(pid) {
        try {
            const productManager = new ProductManager();
            const products = await productManager.readProducts();
            return products.some((product) => product.id == pid)
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);

            if (!cart) {
                console.log('Error: El carrito no existe');
                return;
            }

            cart.products = cart.products.filter(product => {
                return product && product.product && product.product.toString() !== pid;
            });

            await cart.save();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(cid) {
        try {
            await cartModel.findByIdAndDelete(cid);
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartManager;