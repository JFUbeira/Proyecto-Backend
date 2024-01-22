import express from 'express'
import { __dirname } from "./dirname.js"
import handlebars from "express-handlebars"
import viewsRouter from './routes/views.router.js'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import { password, PORT, db_name } from "./env.js"
import mongoose from "mongoose"
import { Server } from "socket.io"
import { messageModel } from './dao/models/message.model.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()

const httpServer = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
)

const io = new Server(httpServer)

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

// Configuracion Handlebars
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

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

app.use(session(
    {
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://JFUbeira:${password}@node-js.mkfobxo.mongodb.net/${db_name}?retryWrites=true&w=majority`,
            mongoOptions: {
                useNewUrlParser: true, useUnifiedTopology: true
            },
            ttl: 10 * 60
        })

    },
    {
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }
))


// Websockets

const messages = []

io.on("connection", async (socket) => {
    console.log("Nuevo usuario conectado");

    try {
        // Cargar mensajes desde MongoDB al conectarse un nuevo usuario
        const storedMessages = await messageModel.find({}).lean();

        // Emitir mensajes al usuario recién conectado
        socket.emit("messages", storedMessages);
    } catch (error) {
        console.error("Error al cargar mensajes desde MongoDB:", error);
    }

    socket.on("message", async (data) => {
        console.log(data);

        try {
            const { user, email, message } = data

            // Guardar el mensaje en MongoDB
            const newMessage = new messageModel({ user, email, message })
            await newMessage.save();

            // Obtener todos los mensajes almacenados en MongoDB
            const storedMessages = await messageModel.find({}).lean();

            // Emitir todos los mensajes a todos los clientes conectados
            io.emit("messages", storedMessages);
        } catch (error) {
            console.error("Error al procesar y enviar mensajes:", error);
        }
    });


    socket.on("inicio", (data) => {
        // Emitir evento 'connected' al resto de los clientes
        socket.broadcast.emit("connected", data.user);
    });
});





