const {
    getWithIdAndQuery,
    getOnlyId,
    getWithPagination,
    getOnlyQuery,
    getGetAll,
    getAvailabilities,
    getAppointmentsByPage,
} = require('./fetchGetters')
const { adaptAndCreateNewAppointment } = require('./fetchPost')
const { deleteById } = require('./fetchDelete')

function parseRouter(router) {
    return (req, res, next) => {
        const method = String(req.method).toLocaleLowerCase()
        const path = req.path.slice(1)
        let result = {
            entity: null,
            data: null,
        }

        if (path !== 'db') {
            if (method === 'get') {
                if (path.includes('/') && path.split('/').length > 1) {
                    if (JSON.stringify(req.query) !== '{}') {
                        result = getWithIdAndQuery(path, router, req)
                    } else {
                        result = getOnlyId(path, router)
                    }
                } else {
                    if (JSON.stringify(req.query) !== '{}') {
                        let entity = path.split('?')[0]
                        if (req.query.page !== undefined) {
                            result = getWithPagination(
                                path,
                                entity,
                                router,
                                req,
                            )
                        } else {
                            result = getOnlyQuery(path, entity, router, req)
                        }
                    } else {
                        result = getGetAll(path, router, req)
                    }

                    // Specific GET Requests
                    if (path.includes('professional-hours-availability')) {
                        result = getAvailabilities(path, router, req)
                    }
                    if (
                        path.includes('appointments') &&
                        req.query.identityNumber &&
                        req.query.page > -1
                    ) {
                        result = getAppointmentsByPage(path, router, req)
                    }
                }
            }
            if (method === 'delete') result = deleteById(path, router)
        } else {
            res.send(router.db)
        }
        if (method === 'delete') result = deleteById(path, router)

        if (method === 'post') {
            if (path === 'appointments') {
                const response = adaptAndCreateNewAppointment(router, req)
                result.entity = 'created'
                result.data = true
            }
        }

        if (JSON.stringify(result.data).length > 2) {
            res.json({
                [result.entity]: result.data,
            })
        } else {
            res.status(404).jsonp({
                [result.entity]: result.data,
            })
        }

        next()
    }
}

module.exports = { parseRouter }
