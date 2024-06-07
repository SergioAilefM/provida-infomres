export type ViewType = 'page' | 'modal' | 'alert' | 'other' | null

export interface ViewData {
    date: string
    viewName: string
    previousPage: string
    currentPage: string
    viewType: ViewType
}

export type LoginType = 'PIP' | 'other' | null
export type BusinessType = 'MO' | 'other' | null

export interface BusinessData {
    loginType: LoginType // ??
    businessType: BusinessType
}

export type UserType = 'EB' | null

export interface UserData {
    userIP: string
    userID: string
    userName: string
    userMail: string
    userPhone: string
    userGender: string
    userBirthday: string
    userType: UserType
    rutHash: string
    region: string
    regionName: string
    municipality: string
    municipalityName: string
    country: string
}

export type ErrorCode =
    | 'auth-failure'
    | 'not-found-404'
    | 'mo-service-error'
    | null

export interface ErrorData {
    title: string
    code: string
    data: string
}

export type EventType = 'click' | 'change' | 'submit' | 'other' | null

export interface EventData {
    date: string
    elementID: string
    eventType: EventType
    eventName: string
    eventDescription: string
}

export interface AdobeState {
    routeSnapshot: RouteSnapshot
    userData: UserData
    business: BusinessData
    view: ViewData
    event?: EventData | null
    error?: ErrorData | null
}

export interface RouteSnapshot {
    previousPage: string
    currentPage: string
}

export interface AdobeContextProps {
    adobeState: AdobeState
    setView: (pageData: ViewData) => void
    setBusiness: (businessData: BusinessData) => void
    setUserIP: (userIP: string) => void
    setUser: (userData: UserData) => void
    setError: (errorData: ErrorData) => void
    removeError: () => void
    setEvent: (eventData: EventData) => void
    removeEvent: () => void
    setRouteSnapshot: (routeSnapshot: RouteSnapshot) => void
}
