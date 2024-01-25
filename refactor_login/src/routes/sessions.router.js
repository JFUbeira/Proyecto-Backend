import { Router } from 'express'
import userModel from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'

const router = Router()

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    const exist = await userModel.findOne({ email })
    if (exist) {
        return res.status(400).send({ status: 'error', message: "User already exists" })
    }

    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role: 'user'
    }

    const result = await userModel.create(user)

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    }

    res.send({ status: "success", message: "User created successfully with ID: " + result.id })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {
            name: 'admin coder',
            email: email,
            role: 'admin'
        }
    }

    else if (!user) {
        return res.status(401).send({ status: 'error', error: "Check your credentials" })
    }

    else if (!isValidPassword(user, password)) {
        return res.status(401).send({ status: 'error', error: "Check your credentials" })
    }

    else {
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        }
    }

    res.send({ status: 'success', payload: req.session.user, message: 'Logged in for the first time successfully' })
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ status: 'error', message: 'Logout error' })
        }
    })
    res.send({ status: 'success', message: 'Logged out successfully' })
})

export default router