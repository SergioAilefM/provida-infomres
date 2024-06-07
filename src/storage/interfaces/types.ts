//import { DeviceName } from '@ds.e/foundation'

export interface Accessibility {
    fontSize: string
    theme: string
    speech: boolean
}
export interface AdobeAnalytics {
    previousPage: string
}
export interface Configuration {
    APP_ENV: string | null
    ID_API_C: string | null
    URL_ORCHESTRA: string | null
    ID_APP_INSIGHT: string | null
    URL_ADOBE: string | null
    ENVIRONMENTORNO: string | null
    VERSION: string | null
    OAUTH_API_BASE_URL: string | null
    OAUTH2_URL_TOKEN: string | null
    OAUTH2_URL_VALIDATE_USER_INFO: string | null
    API_BASE_URL: string | null
    VALID_SESSION_TIME: string | null
    MIS_LOGIN_URL: string | null
    MIS_LOGOUT_URL: string | null
    SECURITY: Security | null
    FEATURE_FLAGS: FeaturesFlags | null
}
export interface TokenOAUTHUserID {
    RESPONSE_TYPE: string | null
    SCOPE: string | null
    CLIENT_ID: string | null
    REDIRECT_URI: string | null
}
export interface Security {
    TOKEN_OAUTH_2_USER_ID: TokenOAUTHUserID | null
}
export interface PolicyUrls {
    SECURITY: {
        NAME: string | null
        URL: string | null
    }
    INVESTMENT: {
        NAME: string | null
        URL: string | null
    }
    ENERSIS: {
        NAME: string | null
        URL: string | null
    }
}
export interface SpLinkData {
    NAME: string | null
    URL: string | null
}

export interface FeaturesFlags {
    MOCK_ERROR_TYPE: ErrorType | null
    PIP_CONNECTION: boolean | null
    APPOINTMENT_SCHEDULER_FORCE_ERROR_NOT_AVAILABLE_APPOINTMENT: boolean | null
    APPOINTMENT_SCHEDULER_FORCE_ERROR_NOT_AVAILABILITY: boolean | null
}
export interface Session {
    isReloaded: boolean
    userId: string | null
    userIdentityNumber: string | null
    clientNumber: string | null
    isLoggedIn: boolean | null
    isAuthorize: boolean | null
    code: string | null
    accessToken: string | null
    idToken: string | null
    expiredIn: number | null
    tokenType: string | null
    lastAccess: string | null
}

export type ErrorType = 'auth-failure' | 'not-found-404' | 'mo-service-error'
export interface Error {
    showError: boolean
    errorType: ErrorType | null
    errorDescription: string
    onButtonClick: () => void
}

export interface RouteSnapshot {
    currentPage: string
    prevPage: string
}

export interface AppState {
    lastInteraction: string
    accessibility: Accessibility
    session: Session
    error: Error
    routeSnapshot: RouteSnapshot
    adobeAnalytics: AdobeAnalytics
    configuration: Configuration | null
    stopLoadingOnError: boolean
    loading: any | null
    showLoading: boolean
    //viewportSize: DeviceName
    disableMenu: boolean
}

export interface AppContextProps {
    appState: AppState
    setLastInteraction: (date: string) => void
    setIsReloaded: (isReloaded: boolean) => void
    setIsLoggedIn: (isLoggedIn: boolean | null) => void
    setIsAuthorize: (setIsAuthorize: boolean | null) => void
    setUserId: (userId: string | null) => void
    setUserIdentityNumber: (userIdentityNumber: string | null) => void
    setClientNumber: (clientNumber: string | null) => void
    setCode: (code: string | null) => void
    setAccessToken: (accessToken: string | null) => void
    setIdToken: (idToken: string | null) => void
    setTokenType: (tokenType: string | null) => void
    setExpiredIn: (expiredIn: number | null) => void
    setError: (error: Error) => void
    removeError: () => void
    setAdobeAnalytics: (adobeAnalytics: AdobeAnalytics) => void
    setConfiguration: (configuration: Configuration) => void
    setStopLoadingOnError: (stopLoading: boolean) => void
    setLoading: (loading: any | null) => void
    setShowLoading: (showLoading: boolean) => void
    //setViewportSize: (viewportSize: DeviceName) => void
    setRouteSnapshot: (routeSnapshot: RouteSnapshot) => void
    setDisableMenu: (disableMenu: boolean) => void
}
