module.exports = {
    type: 'modify',
    path: 'plop/data/service-base-path.json',
    pattern: /(])/g,
    template: ',"{{basePath}}"\n$1',
}