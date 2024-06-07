const utils = require('../utils')

module.exports = {
    description: 'Generate new Component',
    prompts: [
        {
            type: 'list',
            name: 'type',
            message: 'What kind of component do you want to build ?',
            choices: ['Atom', 'Molecule', 'Organism'],
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the component name ?",
            validate: utils.validateComponent('name'),
        },
    ],
    actions: [
        {
            type: 'add',
            path: 'src/components/atomic/{{camelCase type}}s/{{properCase name}}/{{properCase name}}.tsx',
            templateFile: 'plop/templates/components/component.hbs',
        },
        {
            type: 'add',
            path: 'src/components/atomic/{{camelCase type}}s/{{properCase name}}/index.ts',
            templateFile: 'plop/templates/components/index.hbs',
        },
        {
            type: 'add',
            path: 'src/components/atomic/{{camelCase type}}s/{{properCase name}}/{{properCase name}}.test.tsx',
            templateFile: 'plop/templates/components/test.hbs',
        },
        {
            type: 'add',
            path: 'src/components/atomic/{{camelCase type}}s/{{properCase name}}/{{properCase name}}.scss',
            templateFile: 'plop/templates/components/scss.hbs',
        },
        {
            type: 'modify',
            path: 'plop/data/component-library.json',
            pattern: /("ButtonGroup",)/g,
            template: '"{{properCase name}}",\n$1',
        },
    ],
}