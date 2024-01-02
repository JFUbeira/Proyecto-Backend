import { Router } from "express"

const router = Router()

const pets = []

router.get("/", (req, res) => {
    res.json({
        pets
    })
})

router.post("/", (req, res) => {
    const { type, breed, name, age } = req.body

    pets.push({
        type,
        breed,
        name,
        age
    })

    res.json({
        pet: {
            type,
            breed,
            name,
            age
        }
    })
})

export default router


