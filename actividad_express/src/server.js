import express from 'express'

const app = express()

app.get('/bienvenida', (req, res) => {
    res.send("<h1 style='color:blue'>Welcome</h1>")
})

app.get('/usuario', (req, res) => {
    res.json({
        name: 'Juan',
        surname: 'Lopez',
        age: 25,
        email: 'juanlopez@mail.com'
    })
})

app.listen(8080)