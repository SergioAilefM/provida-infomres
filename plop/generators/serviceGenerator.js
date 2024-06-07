    const utils = require('../utils')
    const { modifyServiceBasePath,
            modifyServiceOperation,
            addMockServerData,
            modifyImportDataLoader,
            modifyExportDataLoader,
            modifyMockServerAddGetRout,
            modifyMockServerAddPostRout,
            addGetServiceHook,
            addServiceModel,
            addGetServiceTest,
            addPostServiceHook,
            addPostServiceTest } = require('../actions/services')

    const serviceBasePaths = require('../data/service-base-path.json')
    const serviceOperations = require('../data/service-operation.json')


    const basePathExist = _basePath => {
        return serviceBasePaths.basePaths.includes(_basePath);
    } 

    const serviceOperationExist  = _operationName => {
        return serviceOperations.operations.includes(_operationName)
    }

    const operationNameBuilder = (_operationType, _operationName) => {
        return false
    }

    module.exports = {
        description: 'Generate new Service Hook',
        prompts: [
            {
                type: 'list',
                name: 'operationType',
                message: 'We need to collect some information so we can create a new operation in your service layer.\n REST APIs built on HTTP, the uniform interface includes using standard HTTP verbs to perform operations on resources\n Select the type of operation, it will be part of the name of your service. Like getOPERATION_NAME, postOPERATION_NAME',
                choices: ['Get', 'Post'],
            },
            {
                type: 'input',
                name: 'operationName',
                message: "What is the operation name?",
            },
            {
                type: 'input',
                name: 'basePath',
                message: "What is the base path of the operation? do not include host or port.\nLike...\'/specialty\' Or \'/operation\'",
            },
        ],
        actions: function(data) {
            let actions = [];

            if (!basePathExist(data.basePath)) {
                actions.push(modifyServiceBasePath);
                actions.push(addMockServerData);
                actions.push(modifyImportDataLoader);
                actions.push(modifyExportDataLoader);
                actions.push(addServiceModel);
            }
            actions.push(modifyServiceOperation);

            switch (data.operationType) {
                case 'Get':
                    actions.push(modifyMockServerAddGetRout);
                    actions.push(addGetServiceHook);
                    actions.push(addGetServiceTest);
                    break;
                case 'Post':
                    actions.push(modifyMockServerAddPostRout);
                    actions.push(addPostServiceHook);
                    //  actions.push(addPostServiceTest);
                    break;
                default:
                    // Handle other operation types here
                    break;
            }

            return actions;
        },
    }