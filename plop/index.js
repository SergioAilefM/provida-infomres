const {
    appGenerator,
    componentGenerator,
    pageGenerator,
    serviceGenerator,
    formGenerator
} = require('./generators')

const createLibrary = plop => {
    plop.load('plop-pack-json-modify')
    plop.setPartial('myTitlePartial', '<h1>Dr. Know </h1>')
    plop.setPartial('testPartial', '<h1> Test user interaction, not Internals. </h1>')
    plop.setGenerator('init', appGenerator)
    plop.setGenerator('component', componentGenerator)
    plop.setGenerator('page', pageGenerator)
    plop.setGenerator('service', serviceGenerator)
    plop.setGenerator('form', formGenerator)
}

module.exports = {
    createLibrary
};