import express from 'express'
import session from 'express-session'
import config from './config/config.js'
import MongoStore from 'connect-mongo'
import MongoSingleton from './config/mongodb-singleton.js'
import cors from 'cors'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUIExpress from 'swagger-ui-express'

// import Routers
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import sessionsRouter from './routers/sessions.router.js'
import emailRouter from './routers/email.router.js'
import mockRouter from './routers/mock.router.js'
// import usersRouter from './routers/users.router.js'
// import smsRouter from './routers/sms.router.js'

import { addLogger } from './utils/baseLogger.js'

const app = express()

// JSON settings and middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(addLogger)

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

// swagger settings
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación API ecommerce',
            description: 'Documentación para uso de swagger',
        },
    },
    apis: [`./src/docs/**/*.yaml`],
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

// routes declaration 
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/email', emailRouter)
app.use('/api/mockingproducts', mockRouter)
// app.use('/api/users', usersRouter)
// app.use('/api/sms', smsRouter)

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