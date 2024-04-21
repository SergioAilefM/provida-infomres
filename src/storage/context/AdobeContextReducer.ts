import { AdobeState } from '../interfaces/adobeTypes'
import { AdobeStateAction } from './AdobeContextActions'

export const adobeStateReducer = (
    state: AdobeState,
    action: AdobeStateAction,
): AdobeState => {
    switch (action.type) {
        case 'setUserIP':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    userIP: action.payload,
                },
            }
        case 'setView':
            return {
                ...state,
                view: action.payload,
            }

        case 'setBusiness':
            return {
                ...state,
                business: action.payload,
            }
        case 'setUser':
            return {
                ...state,
                userData: action.payload,
            }
        case 'setEvent':
            return {
                ...state,
                event: action.payload,
            }
        case 'removeEvent':
            return {
                ...state,
                event: null,
            }
        case 'setError':
            return {
                ...state,
                error: action.payload,
            }
        case 'removeError':
            return {
                ...state,
                error: null,
            }
        case 'setRouteSnapshot':
            return {
                ...state,
                routeSnapshot: {
                    previousPage: action.payload.previousPage,
                    currentPage: action.payload.currentPage,
                },
            }
        default:
            return state
    }
}
