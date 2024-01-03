import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewRouter from './routes/views.router.js'

const app = express()
const port = 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Engine setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

// Set views
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

// Public folder
app.use(express.static(`${__dirname}/public`))

// Routes
app.use('/', viewRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))