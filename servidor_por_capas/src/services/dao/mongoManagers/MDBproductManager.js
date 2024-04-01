import { productModel } from '../models/product.model.js';

class ProductManager {
    async readProducts() {
        try {
            const products = await productModel.find();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async writeProducts(products) {
        try {
            await productModel.deleteMany({}); // Elimina todos los documentos existentes
            await productModel.insertMany(products); // Inserta los nuevos productos
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, code, stock, category } = product;

            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                console.log('Error: Todos los campos son obligatorios');
            } else if (await productModel.findOne({ code })) {
                console.log('Error: El código del producto ya existe');
            } else {
                const newProduct = new productModel({
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    category,
                });
                await newProduct.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            const products = await this.readProducts();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            if (!product) {
                console.log('Error: El producto no existe');
            } else {
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(pid, updatedProduct) {
        try {
            const product = await productModel.findById(pid);

            if (!product) {
                console.log('Error: El producto no existe');
            } else {
                Object.assign(product, updatedProduct); // Actualiza los campos
                await product.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const result = await productModel.findByIdAndDelete(id);
            if (!result) {
                console.log('Error: El producto no existe');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductManager

