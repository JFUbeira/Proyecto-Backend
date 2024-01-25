import { Router } from 'express'
import userModel from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'
import passport from 'passport'

const router = Router()

router.post('/register', passport.authenticate('register', {
    failureRedirect: 'api/session/fail-register'
}), async (req, res) => {
    console.log("Registering user:")
    res.status(201).send({ status: "success", message: "User created successfully" })
})

router.post('/login', passport.authenticate('login',
    {
        failureRedirect: 'api/session/fail-login'
    }
), async (req, res) => {
    console.log("User found to login:")

    const user = req.user
    console.log(user)

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    }

    res.send({ status: "success", payload: req.session.user, message: "Logged in for the first time successfully" })
})

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" })
})

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" })
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ status: 'error', message: 'Logout error' })
        }
    })
    res.send({ status: 'success', message: 'Logged out successfully' })
})

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    { }
})

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/api/products")
})

export default router


// router.post('/register', async (req, res) => {
//     const { first_name, last_name, email, age, password } = req.body

//     const exist = await userModel.findOne({ email })
//     if (exist) {
//         return res.status(400).send({ status: 'error', message: "User already exists" })
//     }

//     const user = {
//         first_name,
//         last_name,
//         email,
//         age,
//         password: createHash(password),
//         role: 'user'
//     }

//     const result = await userModel.create(user)

//     req.session.user = {
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         age: user.age,
//         role: user.role
//     }

//     res.send({ status: "success", message: "User created successfully with ID: " + result.id })
// })


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body
//     const user = await userModel.findOne({ email })

//     if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//         req.session.user = {
//             name: 'admin coder',
//             email: email,
//             role: 'admin'
//         }
//     }

//     else if (!user) {
//         return res.status(401).send({ status: 'error', error: "Check your credentials" })
//     }

//     else if (!isValidPassword(user, password)) {
//         return res.status(401).send({ status: 'error', error: "Check your credentials" })
//     }

//     else {
//         req.session.user = {
//             name: `${user.first_name} ${user.last_name}`,
//             email: user.email,
//             age: user.age,
//             role: user.role
//         }
//     }

//     res.send({ status: 'success', payload: req.session.user, message: 'Logged in for the first time successfully' })
// })