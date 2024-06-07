module.exports = {
    type: 'json-modify-file',
    JSONFile: './src/services/reactQuery/keysMap.json',
    JSONKey: `{{camelCase basePath}}`,
    JSONEntryKey: '{{camelCase operationType}}{{properCase operationName}}',
    JSONEntryValue: '{{camelCase operationType}}{{properCase operationName}}'   
}