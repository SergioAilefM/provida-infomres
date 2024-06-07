const availability = require('./data/availability.json')
const appointment = require('./data/appointment.json')
const professional = require('./data/professional.json')
const specialty = require('./data/specialty.json')
const user = require('./data/user.json')
const specialtiesSampleData = require('./data/specialtiesSampleData.json')

const perfilesData = require('./data/perfilesData.json');
const usuariosData = require('./data/usuariosData.json');
const rolesData = require('./data/rolesData.json');
const funcionalidadData = require('./data/funcionalidadData.json');
// IMPORT JSON FILES

module.exports = function () {
    return {
        ...availability,
        ...appointment,
        ...professional,
        ...specialty,
        ...user,
        ...specialtiesSampleData,
        ...perfilesData,
        ...usuariosData,
        	...rolesData,
	...funcionalidadData,
// EXPORT JSON FILES
    }
}
