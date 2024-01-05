import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import homeRouter from './routes/home.router.js'

const app = express()
const port = 8080

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


app.listen(port)
