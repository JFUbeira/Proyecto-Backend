import { Router } from "express"

const router = Router()

const users = [
    {
        name: 'Javier',
        surname: 'Lopez',
        age: 25,
        email: 'javierlopez@mail.com',
        phone: 123456789
    },
    {
        name: 'Juan',
        surname: 'Perez',
        age: 30,
        email: 'juanperez@mail.com',
        phone: 987654321
    },
    {
        name: 'Pedro',
        surname: 'Garcia',
        age: 35,
        email: 'pedrogarcia@mail.com',
        phone: 456789123
    },
    {
        name: 'Maria',
        surname: 'Gonzalez',
        age: 40,
        email: 'mariagonzalez@mail.com',
        phone: 789123456
    },
    {
        name: 'Ana',
        surname: 'Martinez',
        age: 45,
        email: 'anamartinez@mail.com',
        phone: 321654987
    }
]

router.get('/', (req, res) => {
    const randomIndex = Math.floor(Math.random() * users.length)
    const randomUser = users[randomIndex]
    res.render('index', { user: randomUser })
})

export default router

