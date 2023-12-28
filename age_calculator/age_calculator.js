const moment = require('moment')

currentDate = moment()
console.log(currentDate)

birthDate = moment('1996-10-11')
console.log(birthDate)

if (birthDate.isValid()) {
    ageInDays = currentDate.diff(birthDate, 'days')
    console.log(ageInDays)
}