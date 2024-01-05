import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

import { Server } from 'socket.io'

import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import homeRouter from './routes/home.router.js'
import RealTimeProducts from './routes/realTimeProducts.router.js'
import ProductManager from './productManager.js'

const app = express()
const port = 8080
const httpServer = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

app.use(express.static(`${__dirname}/public`))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', homeRouter)
app.use('/realTimeProducts', RealTimeProducts)

const productManager = new ProductManager()
const products = await productManager.getProducts()

socketServer.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado")

    socketClient.on("message", (data) => {
        console.log(data)
    })

    socketClient.on('formData', (data) => {
        console.log(data)
        productManager.addProduct(data)
        socketClient.emit('products', products)
    })

    socketClient.emit('products', products)
})
