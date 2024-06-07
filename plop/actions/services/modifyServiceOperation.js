module.exports = {
    type: 'modify',
    path: 'plop/data/service-operation.json',
    pattern: /(])/g,
    template: ',"{{basePath}}/{{camelCase operationType}}{{properCase operationName}}"\n$1',
}