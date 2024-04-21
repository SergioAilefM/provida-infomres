/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

require('jest-canvas-mock')

global.window.matchMedia = query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: (_: Event) => true,
})

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

global.window.HTMLElement.prototype.scrollIntoView = () => {}

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}))

jest.mock('@hooks/useAppContext')

jest.mock('@hooks/useAdobeAnalytics')

Object.defineProperty(window, 'config', {
    value: { API_BASE_URL: 'http://0.0.0.0:3004', APP_ENV: 'local' },
})
