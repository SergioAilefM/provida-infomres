const availability = require('./data/availability.json')
const appointment = require('./data/appointment.json')
const professional = require('./data/professional.json')
const specialty = require('./data/specialty.json')
const user = require('./data/user.json')
const specialtiesSampleData = require('./data/specialtiesSampleData.json')
// IMPORT JSON FILES

module.exports = function () {
    return {
        ...availability,
        ...appointment,
        ...professional,
        ...specialty,
        ...user,
        ...specialtiesSampleData,
        // EXPORT JSON FILES
    }
}
