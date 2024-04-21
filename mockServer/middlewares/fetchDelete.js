function deleteById(path, router) {
    let entity = path.split('/')[0]
    const id = path.split('/')[1]
    let data = router.db.get(entity).remove({ id: +id }).write()

    entity = entity.replaceAll('-', '')

    data = { delete: true }

    return { entity, data }
}

module.exports = { deleteById }
