import express from 'express'
import { __dirname } from "./dirname.js"
import handlebars from "express-handlebars"
import viewsRouter from './routes/views.router.js'
import { password, PORT, db_name } from "./env.js"
import mongoose from "mongoose"

// import productRouter from './routes/products.router.js'
// import cartRouter from './routes/carts.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use('/api/products', productRouter)
// app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

