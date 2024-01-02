import express from 'express'
import petRouter from './routes/pets.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Welcome'
//     })
// })

app.use('/pets', petRouter)

app.listen(8080)
