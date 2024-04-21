const adaptAndCreateNewAppointment = (router, req) => {
    const professionalId = req.body.professionalId
    const specialtyId = req.body.specialtyId

    const professionalsBySpecialty = router.db
        .get('professionals-by-specialty')
        .value()
    const specialties = router.db.get('specialties').value()

    const professional = professionalsBySpecialty.find(
        professional => professional.id == professionalId,
    )
    const specialty = specialties.find(specialty => specialty.id == specialtyId)

    const status = 'Programado'
    const schedStartTime = req?.body?.startTime
    const schedEndTime = req?.body?.endTime

    const newAppointmentId = router.db.get('appointments').value().length + 1

    const newAppointment = {
        id: newAppointmentId,
        identityNumber: '169397759',
        professional: professional.name,
        specialty: specialty.title,
        status,
        schedStartTime,
        schedEndTime,
    }

    // Agregar el nuevo dato al array de "appointments" en memoria
    router.db.get('appointments').push(newAppointment).write()

    // Obtener el resultado actualizado de la colección "appointments"
    const data = router.db.get('appointments').value()

    return { data }
}

module.exports = {
    adaptAndCreateNewAppointment,
}
