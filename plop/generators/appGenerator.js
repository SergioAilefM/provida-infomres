const utils = require('../utils')

module.exports = {
    description: 'Initial Application Configuration',
    prompts: [
        {
            type: 'list',
            name: 'company',
            message: 'What company does the application belong to?',
            choices: ['MetLife', 'Provida'],
        },
        {
            type: 'input',
            name: 'app_name',
            message: "What's the application name ?",
        },
    ],
    actions: [
        {
            type: 'modify',
            path: 'plop/data/app-config.json',
            pattern: /("COMPANY_NAME",)/g,
            template: '"{{properCase company}}",',
        },
        {
            type: 'modify',
            path: 'plop/data/app-config.json',
            pattern: /("APP_NAME")/g,
            template: '"{{properCase app_name}}"',
        },
        {
            type: 'modify',
            path: 'package.json',
            pattern: /("COMPANY_NAME-APP_NAME",)/g,
            template: '"{{properCase company}}-{{properCase app_name}}",',
        },
        {
            type: 'modify',
            path: 'package-lock.json',
            pattern: /("COMPANY_NAME-APP_NAME",)/g,
            template: '"{{properCase company}}-{{properCase app_name}}",',
        },
        {
            type: 'modify',
            path: 'public/index.html',
            pattern: /(COMPANY_NAME APP_NAME)/g,
            template: '{{properCase company}} {{properCase app_name}}',
        },
        {
            type: 'modify',
            path: 'public/manifest.json',
            pattern: /("APP_NAME",)/g,
            template: '"{{properCase app_name}}",',
        },
        {
            type: 'modify',
            path: 'src/constants/pageTitle.ts',
            pattern: /(COMPANY_NAME APP_NAME)/g,
            template: '{{properCase company}} {{properCase app_name}}',
        },
        {
            type: 'modify',
            path: 'src/hooks/useAdobeAnalytics.ts',
            pattern: /(COMPANY_NAME_APP_NAME)/g,
            template: '{{properCase company}}_{{properCase app_name}}',
        },
        {
            type: 'modify',
            path: 'src/App.scss',
            pattern: /(APP_NAME)/g,
            template: '{{lowerCase app_name}}',
        },
        {
            type: 'modify',
            path: 'src/App.tsx',
            pattern: /(APP_NAME)/g,
            template: '{{lowerCase app_name}}',
        },
    ],
}