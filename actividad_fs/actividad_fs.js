const currentDate = new Date()
const day = currentDate.getDate()
const month = currentDate.getMonth() + 1 // Los meses en JavaScript comienzan desde 0, por lo que sumamos 1
const year = currentDate.getFullYear()
const hours = currentDate.getHours()
const minutes = currentDate.getMinutes()

// Puedes combinar estos valores en una cadena de fecha y hora
const formattedDateTime = `${day}/${month}/${year}, ${hours}:${minutes}`

const fs = require('fs')

fs.writeFile('./actividad_fs.txt', formattedDateTime, (err) => {
    if (err) {
        console.log(err)
    }
})

fs.readFile('./actividad_fs.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data)
})
