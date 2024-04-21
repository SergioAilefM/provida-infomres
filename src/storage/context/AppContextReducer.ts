import LocalStorage from '@storage/browser/LocalStorage'
import { AppState } from '../interfaces/types'
import { AppStateAction } from './AppContextTypes'

export const appStateReduces = (
    state: AppState,
    action: AppStateAction,
): AppState => {
    const storage = new LocalStorage()

    switch (action.type) {
        case 'lastInteraction':
            return {
                ...state,
                lastInteraction: action.payload,
            }
        case 'setAdobeAnalytics':
            return {
                ...state,
                adobeAnalytics: action.payload,
            }
        case 'setConfiguration':
            return {
                ...state,
                configuration: action.payload,
            }

        case 'increaseFontSize':
            return state
        case 'reduceFontSize':
            return state
        case 'changeTheme':
            return state
        case 'switchSpeech':
            return state
        case 'setIsReloaded':
            return {
                ...state,
                session: {
                    ...state.session,
                    isReloaded: action.payload,
                },
            }
        case 'setIsLoggedIn':
            storage.set(
                'isLoggedIn',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    isLoggedIn: action.payload,
                },
            }

        case 'setIsAuthorize':
            storage.set(
                'isAuthorize',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    isAuthorize: action.payload,
                },
            }
        case 'setUserId':
            storage.set(
                'userId',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    userId: action.payload,
                },
            }
        case 'setClientNumber':
            storage.set(
                'clientNumber',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    clientNumber: action.payload,
                },
            }
        case 'setCode':
            storage.set(
                'code',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    code: action.payload,
                },
            }
        case 'setAccessToken':
            storage.set(
                'accessToken',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    accessToken: action.payload,
                },
            }
        case 'setIdToken':
            storage.set(
                'idToken',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    idToken: action.payload,
                },
            }
        case 'setTokenType':
            storage.set(
                'tokenType',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    tokenType: action.payload,
                },
            }
        case 'setExpiredIn':
            storage.set(
                'expiredIn',
                action.payload ? action.payload.toString() : 'null',
            )
            return {
                ...state,
                session: {
                    ...state.session,
                    expiredIn: action.payload,
                },
            }
        case 'setError':
            return {
                ...state,
                error: action.payload,
            }
        case 'removeError':
            return {
                ...state,
                error: {
                    showError: false,
                    errorType: null,
                    errorDescription: '',
                    onButtonClick: () => {},
                },
            }
        case 'stopLoadingOnError':
            return {
                ...state,
                stopLoadingOnError: action.payload,
            }
        case 'setLoading':
            return {
                ...state,
                loading: action.payload,
            }
        case 'setShowLoading':
            return {
                ...state,
                showLoading: action.payload,
            }
        case 'setViewportSize':
            return {
                ...state,
                viewportSize: action.payload,
            }
        case 'setDisableMenu':
            return { ...state, disableMenu: action.payload }
        case 'setRouteSnapshot':
            return { ...state, routeSnapshot: action.payload }
        default:
            return state
    }
}
