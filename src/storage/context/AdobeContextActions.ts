import {
    ViewData,
    BusinessData,
    UserData,
    ErrorData,
    EventData,
    RouteSnapshot,
} from '../interfaces/adobeTypes'

export type AdobeStateAction =
    | { type: 'setUserIP'; payload: string }
    | { type: 'setView'; payload: ViewData }
    | { type: 'setBusiness'; payload: BusinessData }
    | { type: 'setUser'; payload: UserData }
    | { type: 'setEvent'; payload: EventData }
    | { type: 'removeEvent' }
    | { type: 'setError'; payload: ErrorData }
    | { type: 'removeError' }
    | { type: 'setRouteSnapshot'; payload: RouteSnapshot }
