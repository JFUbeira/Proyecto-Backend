import { Router } from "express"

const router = Router()

router.get("/register", (req, res) => {
    res.render("register")
})

const users = []

router.post("/user", (req, res) => {
    const { username, email, password } = req.body;

    try {
        users.push({
            username,
            email,
            password
        });

    } catch (error) {
        console.log(error);
    }

    console.log(users);
})

export default router