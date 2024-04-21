const utils = require('../utils')

module.exports = {
    description: 'Generate new page',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message:
                "What's the variable name? 'refers to internal variable, this should be written in English, ('home', 'specialty detail' )'",
            validate: utils.validatePageName('name'),
        },
        {
            type: 'input',
            name: 'path',
            message:
                "What's the path value ? 'consider the value of the url , which is displayed in the web browser, ('home', 'especialidades/:specialtyId') the initial '/' is added automatically '",
            validate: utils.validatePagePath('path'),
        },
    ],
    actions: [
        {
            type: 'add',
            path: 'src/components/atomic/pages/{{camelCase name}}/{{properCase name}}Page.tsx',
            templateFile: 'plop/templates/pages/controller.hbs',
        },
        {
            type: 'add',
            path: 'src/components/atomic/pages/{{camelCase name}}/{{properCase name}}.test.tsx',
            templateFile: 'plop/templates/pages/test.hbs',
        },
        {
            type: 'add',
            path: 'src/components/atomic/templates/{{camelCase name}}/{{properCase name}}.scss',
            templateFile: 'plop/templates/pages/template.hbs',
        },
        {
            type: 'add',
            path: 'src/constants/{{camelCase name}}PageLabels.ts',
            templateFile: 'plop/templates/pages/label.hbs',
        },
        {
            path: 'src/constants/pageTitle.ts',
            pattern: /(\/\/ PAGE NAME DECLARATIONS)/g,
            template: "{{upperCase name}}: '{{camelCase path}}',\n\t$1",
            type: 'modify',
        },
        {
            path: 'src/constants/pageTitle.ts',
            pattern: /(\/\/ PAGE TITLE DECLARATIONS)/g,
            template:
                '{{upperCase name}}: `${ APP_NAME } - ${ PAGE.{{upperCase name}} }`,\n\t$1',
            type: 'modify',
        },
        {
            path: 'src/constants/paths.ts',
            pattern: /(\/\/ PAGE PATHS TYPE DECLARATIONS)/g,
            template: "| '/{{ path }}'\n\t$1",
            type: 'modify',
        },
        {
            path: 'src/constants/paths.ts',
            pattern: /(\/\/ PAGE PATHS DECLARATIONS)/g,
            template: "{{upperCase name}}: '/{{ path }}',\n\t$1",
            type: 'modify',
        },
        {
            path: 'src/AppRoutes.tsx',
            pattern: /(\/\/ LOAD PAGE ASYNCHRONOUSLY)/g,
            template:
                "const {{properCase name}}Page = lazy( () => import('@pages/{{camelCase name}}/{{properCase name}}Page') );\n$1",
            type: 'modify',
        },
        {
            path: 'src/AppRoutes.tsx',
            pattern: /(\{\/\* ADD PAGE ROUTE \*\/\})/g,
            templateFile: 'plop/templates/pages/route.hbs',
            type: 'modify',
        },
        {
            type: 'modify',
            path: 'plop/data/pages-name.json',
            pattern: /("ROOT",)/g,
            template: '"{{upperCase name}}",\n\t\t$1',
        },
        {
            type: 'modify',
            path: 'plop/data/pages-path.json',
            pattern: /("\/",)/g,
            template: '"/{{ path }}",\n\t\t$1',
        },
    ],
}