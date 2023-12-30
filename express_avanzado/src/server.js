import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const initialPhrase = ['The', 'cat', 'is', 'under', 'the', 'table']

app.get('/api/frase', (req, res) => {
    res.json({
        frase: initialPhrase.join(' ')
    })
})

app.get('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    const searchedWord = initialPhrase[parseInt(pos) - 1]
    if (!searchedWord) {
        res.json({
            error: 'Palabra no encontrada'
        })
    } else {
        res.json({
            buscada: searchedWord
        })
    }
})

app.post('/api/palabras', (req, res) => {
    const { palabra } = req.body

    const position = 3
    initialPhrase.splice(position, 0, palabra)

    res.json({
        agregada: palabra,
        pos: position + 1
    })
})

app.put('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    const { palabra } = req.body
    initialPhrase[parseInt(pos) - 1] = palabra
    res.json({
        actualizada: palabra,
        anterior: initialPhrase[parseInt(pos) - 1]
    })
})

app.listen(8080)