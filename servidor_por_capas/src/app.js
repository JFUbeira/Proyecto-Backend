import express from 'express'
import session from 'express-session'
import config from './config/config.js'
import MongoStore from 'connect-mongo'
import MongoSingleton from './config/mongodb-singleton.js'
import cors from 'cors'
import passport from 'passport'
import initializePassport from './config/passport.config.js'

// import Routers
// import usersRouter from './routers/users.router.js'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import sessionsRouter from './routers/sessions.router.js'

const app = express()

// JSON settings and middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// session settings
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.mongoURL,
        }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

// passport settings
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// routes declaration 
// app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

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

mongoInstance()