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

mongoose
    .connect(
        `mongodb+srv://JFUbeira:${password}@node-js.mkfobxo.mongodb.net/${db_name}?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("Hubo un error");
        console.log(err);
    });

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
    })
)

app.set("view engine", "hbs")
app.set("views", __dirname + "/views")

app.use(express.static(__dirname + "/public"))

// app.use('/api/products', productRouter)
// app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

