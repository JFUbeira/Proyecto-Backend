import { Router } from "express"

const router = Router()

router.get('/chat', (req, res) => {
    res.render("chat", {})
})

router.get("/api/sessions/login", (req, res) => {
    res.render('login')
})

router.get("/api/sessions/register", (req, res) => {
    res.render('register')
})

router.get("/", (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})

export default router



