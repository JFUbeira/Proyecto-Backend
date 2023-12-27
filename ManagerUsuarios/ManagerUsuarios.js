const fs = require('fs')

class ManagerUsuarios {
    constructor() {
        this.usuarios = []
    }

    async crearUsuario(nombre, apellido, edad, curso) {
        if (!nombre || !apellido || !edad || !curso) {
            console.log('Error: Todos los campos son obligatorios')
        } else {
            const newUser = new User(nombre, apellido, edad, curso)
            this.usuarios.push(newUser)

            try {
                const data = JSON.stringify(this.usuarios)
                await fs.promises.writeFile('./usuarios.json', data)
                console.log('Usuario creado exitosamente')
            } catch (error) {
                console.log(error)
            }
        }
    }

    async leerUsuarios() {
        try {
            const fileInfo = await fs.promises.stat('./usuarios.json')
            if (fileInfo.size === 0) {
                console.log('El archivo usuarios.json está vacío')
                return
            }

            const data = await fs.promises.readFile('./usuarios.json', 'utf-8')
            this.usuarios = JSON.parse(data)

            console.log(JSON.stringify(this.usuarios, null, 2))
        } catch (error) {
            console.log(error)
        }
    }
}

class User {
    constructor(nombre, apellido, edad, curso) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.curso = curso
    }
}

async function ejecutar() {
    const managerUsuarios = new ManagerUsuarios()

    await managerUsuarios.crearUsuario('pedro', 'perez', 20, 'java')
    await managerUsuarios.crearUsuario('javier', 'garcia', 23, 'backend')
    await managerUsuarios.crearUsuario('maria', 'lopez', 22, 'frontend')

    await managerUsuarios.leerUsuarios()
}

ejecutar()
