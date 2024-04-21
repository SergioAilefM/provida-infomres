const modifyServiceBasePath = require('./modifyServiceBasePath')
const modifyServiceOperation = require('./modifyServiceOperation')
const addMockServerData = require('./addMockServerData')
const modifyImportDataLoader = require('./modifyImportDataLoader')
const modifyExportDataLoader = require('./modifyExportDataLoader')
const modifyMockServerAddGetRout = require('./modifyMockServerAddGetRout')
const modifyMockServerAddPostRout = require('./modifyMockServerAddPostRout')
const modifyReactQueryAddKey = require('./modifyReactQueryAddKey')
const modifyReactQueryAddPath = require('./modifyReactQueryAddPath')
const addGetServiceHook = require('./addGetServiceHook')
const addServiceModel = require('./addServiceModel')
const addGetServiceTest = require('./addGetServiceTest')
const addPostServiceHook = require('./addPostServiceHook')
const addPostServiceTest = require('./addPostServiceTest')

module.exports = {  
    modifyServiceBasePath,
    modifyServiceOperation,
    addMockServerData,
    modifyImportDataLoader,
    modifyExportDataLoader,
    modifyMockServerAddGetRout,
    modifyMockServerAddPostRout,
    modifyReactQueryAddKey,
    modifyReactQueryAddPath,
    addGetServiceHook,
    addServiceModel,
    addGetServiceTest,
    addPostServiceHook,
    addPostServiceTest
}