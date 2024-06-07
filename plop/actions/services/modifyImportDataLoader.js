module.exports = {
    type: 'modify',
    path: 'mockServer/dbLoader.js', 
    pattern: /(\/\/ IMPORT JSON FILES)/g,
    template:"const {{camelCase basePath}}Data = require('./data/{{camelCase basePath}}Data.json');\n$1",
}