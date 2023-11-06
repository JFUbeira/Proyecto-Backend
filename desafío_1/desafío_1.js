class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Error: Todos los campos son obligatorios')
        } else if (this.products.find((product) => product.code === code)) {
            console.log('Error: El código del producto ya existe')
        } else {
            const newProduct = new Product(
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            )
            newProduct.id = this.products.length + 1
            this.products.push(newProduct)
        }
    }
    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id)
        if (!product) {
            console.log('Error: No se encontró el producto')
        } else {
            console.log(product)
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

const productManager = new ProductManager()

console.log(productManager.getProducts())

productManager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
)

console.log(productManager.getProducts())

productManager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
)

productManager.getProductById(1)
productManager.getProductById(2)

productManager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'OTRO_CODIGO',
    25
)

productManager.getProductById(2)
