const rootDir = '<rootDir>/src'

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: [`${rootDir}/setupTests.ts`],
    transformIgnorePatterns: [
        '/node_modules/(?!@ds.e/react|@ds.e/scss|@ds.e/foundation)',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            require.resolve('./file-mock.js'),
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@adobeAnalytics/(.*)$': `${rootDir}/analytics/$1`,
        '^@assetsJSON/(.*)$': `${rootDir}/assets/json/$1`,
        '^@assetsSVG/(.*)$': `${rootDir}/assets/svg/$1`,
        '^@assetsICONS/(.*)$': `${rootDir}/assets/icons/$1`,
        '^@atoms/(.*)$': `${rootDir}/components/atomic/atoms/$1`,
        '^@molecules/(.*)$': `${rootDir}/components/atomic/molecules/$1`,
        '^@organisms/(.*)$': `${rootDir}/components/atomic/organisms/$1`,
        '^@templates/(.*)$': `${rootDir}/components/atomic/templates/$1`,
        '^@pages/(.*)$': `${rootDir}/components/atomic/pages/$1`,
        '^@hoc/(.*)$': `${rootDir}/components/hoc/$1`,
        '^@custom/(.*)$': `${rootDir}/components/custom/$1`,
        '^@constants/(.*)$': `${rootDir}/constants/$1`,
        '^@helpers/(.*)$': `${rootDir}/helpers/$1`,
        '^@hooks/(.*)$': `${rootDir}/hooks/$1`,
        '^@scss/(.*)$': `${rootDir}/scss/$1`,
        '^@services/(.*)$': `${rootDir}/services/$1`,
        '^@storage/(.*)$': `${rootDir}/storage/$1`,
        '^@utilities/(.*)$': `${rootDir}/utilities/$1`,
        '^@test/(.*)$': `${rootDir}/test/$1`,
        '^@models/(.*)$': `${rootDir}/services/models/$1`,
        '^@axios/(.*)$': `${rootDir}/services/axiosInstance/$1`,
        '^@query/(.*)$': `${rootDir}/services/reactQuery/$1`,
    },
}
