const { DateTime } = require('luxon')

function getWithIdAndQuery(path, router, req) {
    let entity = path.split('/')[0]
    const id = path.split('/')[1].split('?')[0]

    const data = router.db.get(entity).getById(id).filter(req.query)

    entity = entity.replaceAll('-', '')
    return { entity, data }
}

function getOnlyId(path, router) {
    let entity = path.split('/')[0]
    const id = path.split('/')[1]
    const data = router.db.get(entity).getById(id)

    entity = entity.replaceAll('-', '')

    return { entity, data }
}

function getWithPagination(path, entity, router, req) {
    const elementsPerPage = 7
    const startPagination = +req.query.page * elementsPerPage

    const data = router.db
        .get(entity)
        .filter({ identityNumber: req.query.identityNumber })
        .slice(startPagination, startPagination + elementsPerPage)
        .value()

    entity = entity.replaceAll('-', '')
    return { entity, data }
}

function getOnlyQuery(path, entity, router, req) {
    const data = router.db.get(entity).filter(req.query)

    entity = entity.replaceAll('-', '')

    return { entity, data }
}

function getGetAll(path, router) {
    let entity = path.replace('/', '')
    const data = router.db.get(entity)

    entity = entity.replaceAll('-', '')
    return { entity, data }
}

const isGettingAvailabilities = path => {
    const regex =
        /\/specialty\/(\w+)\/professional\/(\w+)\/availability\/daily\/(\w+)\/monthly\/(\w+)\/(\w+)/
    const match = path.match(regex)
    return !!match
}

const getAvailabilities = (path, router, req) => {
    let data = router.db
        .get('professional-hours-availability')
        .filter(req.query)
        .value()
    data = data.map(availability => {
        return {
            id: availability.id,
            startTime: availability.startTime,
            endTime: availability.endTime,
        }
    })
    const entity = 'availabilities'
    return {
        entity,
        data,
    }
}

const isGettingAppointmentsByPage = path => {
    const regex = /^\/appointments\?identityNumber=\d+&page=\d+$/
    const isMatching = regex.test(path)
    return isMatching
}

const getAppointmentsByPage = (path, router, req) => {
    const appointments = router.db
        .get('appointments')
        .filter({ identityNumber: req.query.identityNumber })
        .value()

    const appointmentsOrderedByDate = appointments.sort((a, b) => {
        const startTimeA = DateTime.fromISO(a.schedStartTime)
        const startTimeB = DateTime.fromISO(b.schedStartTime)
        return startTimeA - startTimeB
    })

    const entity = 'appointments'

    // Paginación
    const itemsPerPage = 7 // Cantidad de items por página
    const currentPage = parseInt(req.query.page) || 1 // Página solicitada (por defecto: 1)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const pagedAppointments = appointmentsOrderedByDate.slice(
        startIndex,
        endIndex,
    )

    return {
        entity,
        data: pagedAppointments,
    }
}

module.exports = {
    getWithIdAndQuery,
    getOnlyId,
    getWithPagination,
    getOnlyQuery,
    getGetAll,
    isGettingAvailabilities,
    getAvailabilities,
    isGettingAppointmentsByPage,
    getAppointmentsByPage,
}
