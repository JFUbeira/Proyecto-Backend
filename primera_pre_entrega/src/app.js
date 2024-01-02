import express from 'express'
import productRouter from './routes/products.router.js'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)

app.listen(8080)
