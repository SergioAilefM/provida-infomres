// Import necessary modules and functions
const fs = require('fs/promises') // File system module for async file operations
const path = require('path') // Path module for working with file paths
const { trimRight, isEmpty, includes } = require('lodash') // Lodash functions for string manipulation

// Function to ensure plural form of a text
const ensurePlural = text => trimRight(text, 's') + 's'

// Function to check if a value is not empty
const isNotEmptyFor = name => value =>
    isEmpty(value) ? `name is required` : true

// Function to convert a string to proper case (capitalize first letter of each word)
const toProperCase = str =>
    str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')

const toUpperCase = str =>
    str
        .toLowerCase()
        .split(' ')
        .map(word => word.toUpperCase())
        .join('_')

// Function to load and parse JSON data from a source file
const loadSource = async source => {
    const data = await fs.readFile(source)
    return JSON.parse(data)
}

// Exported function to validate a component name
exports.validateComponent = _name => async value => {
    return isEmpty(value)
        ? `name is required`
        : (
            await loadSource(
                path.join(__dirname, './data/component-library.json'),
            )
        ).components.includes(toProperCase(value))
            ? 'This component already exists'
            : true
}

// Exported function to validate a page name
exports.validatePageName = _name => async value => {
    return isEmpty(value)
        ? `name is required`
        : (
            await loadSource(path.join(__dirname, './data/pages-name.json'))
        ).pages.includes(toUpperCase(value))
            ? 'This page already exists'
            : true
}

// Exported function to validate a page path
exports.validatePagePath = _path => async value => {
    return isEmpty(value)
        ? `path is required`
        : (
            await loadSource(path.join(__dirname, './data/pages-path.json'))
        ).paths.includes(`/${value}`)
            ? 'This path already exists'
            : true
}