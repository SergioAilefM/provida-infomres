module.exports  = {
    type: 'modify',
    path: 'mockServer/dbLoader.js',
    pattern: /(\/\/ EXPORT JSON FILES)/g,
    template: '\t...{{camelCase basePath}}Data,\n$1',
}