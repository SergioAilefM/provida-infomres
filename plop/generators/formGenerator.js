const utils = require('../utils')

module.exports = {
    description: 'Generate new page',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message:
                "What's the variable name? 'refers to internal variable'",
            validate: utils.validatePageName('name'),
        },
        {
            type: 'input',
            name: 'path',
            message:
                "What's the path value ? 'consider the value of the url , which is displayed in the web browser ",
            validate: utils.validatePagePath('path'),
        },
    ],
    actions: [
        {
            type: 'add',
            path: 'src/components/atomic/pages/form{{properCase name}}/{{properCase name}}Page.tsx',
            templateFile: 'plop/templates/forms/view.hbs',
        },
        {
            type: 'add',
            path: 'src/hooks/use{{properCase name}}PageController.ts',
            templateFile: 'plop/templates/forms/controller.hbs',
        }
    ],
}