import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { faker } from '@faker-js/faker'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// faker.locale = 'es'
// export const generateUser = () => {
//     let numOfProducts = parseInt(faker.random.numeric(1, { bannedDigits: ['0'] }))
//     const roles = ['admin', 'usuario', 'editor', 'invitado']
//     let products = []
//     for (let i = 0; i < numOfProducts; i++) {
//         products.push(generateProduct())
//     }
//     return {
//         name: faker.name.firstName(),
//         last_name: faker.name.lastName(),
//         sex: faker.name.sex(),
//         birthDate: faker.date.birthdate(),
//         products: products,
//         image: faker.internet.avatar(),
//         id: faker.database.mongodbObjectId(),
//         email: faker.internet.email(),
//         rol: roles[Math.floor(Math.random() * roles.length)]
//     }
// }

export const generateProduct = () => ({
    title: faker.commerce.productName(),
    description: faker.lorem.words(),
    price: faker.datatype.float({ min: 1, max: 1000, precision: 2 }),
    thumbnail: faker.image.imageUrl(),
    code: faker.datatype.uuid(),
    stock: faker.datatype.number({ min: 0, max: 100 }),
    category: faker.commerce.department(),
});

export default __dirname