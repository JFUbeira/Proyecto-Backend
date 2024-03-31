import express from 'express'
import config from './config/config.js'
import MongoSingleton from './config/mongodb-singleton.js'
import cors from 'cors'

// import Routers
import usersRouter from './routers/users.router.js'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'

const app = express()

// JSON settings and middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// routes declaration 
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const server_port = config.port
app.listen(server_port, () => {
    console.log(`Server running on port ${server_port}`)
})

// Mongo instance
const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
        console.log('MongoDB connected')
    } catch (err) {
        console.error(err)
    }
}