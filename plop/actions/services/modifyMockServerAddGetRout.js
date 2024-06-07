module.exports = {
    type: 'json-modify-file',
    JSONFile: './mockServer/data/routes.json',
    JSONKey: 'custom',
    JSONEntryKey: '/{{camelCase basePath}}/:id',
    JSONEntryValue: '{{basePath}}/:id'
}