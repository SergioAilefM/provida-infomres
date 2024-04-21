import { DeviceName } from '@ds.e/foundation'
import {
    AdobeAnalytics,
    Configuration,
    Error,
    RouteSnapshot,
} from '../interfaces/types'

export type AppStateAction =
    | { type: 'lastInteraction'; payload: string }
    | { type: 'increaseFontSize'; payload: { fontSize: string } }
    | { type: 'reduceFontSize'; payload: { fontSize: string } }
    | { type: 'changeTheme'; payload: { theme: string } }
    | { type: 'setAppointmentSchedulerStep'; payload: number }
    | { type: 'setAppointmentSchedulerFormData'; payload: any }
    | { type: 'resetAppointmentSchedulerState'; payload: null }
    | { type: 'switchSpeech'; payload: boolean }
    | { type: 'setIsReloaded'; payload: boolean }
    | { type: 'setIsLoggedIn'; payload: boolean | null }
    | { type: 'setIsAuthorize'; payload: boolean | null }
    | { type: 'setUserId'; payload: string | null }
    | { type: 'setUserIdentityNumber'; payload: string | null }
    | { type: 'setClientNumber'; payload: string | null }
    | { type: 'setCode'; payload: string | null }
    | { type: 'setAccessToken'; payload: string | null }
    | { type: 'setIdToken'; payload: string | null }
    | { type: 'setTokenType'; payload: string | null }
    | { type: 'setExpiredIn'; payload: number | null }
    | { type: 'setError'; payload: Error }
    | { type: 'removeError' }
    | { type: 'switchSpeech'; payload: { speech: boolean } }
    | { type: 'setAdobeAnalytics'; payload: AdobeAnalytics }
    | { type: 'setRouteSnapshot'; payload: RouteSnapshot }
    | { type: 'setConfiguration'; payload: Configuration }
    | { type: 'stopLoadingOnError'; payload: boolean }
    | { type: 'setLoading'; payload: any }
    | { type: 'setShowLoading'; payload: boolean }
    | { type: 'setViewportSize'; payload: DeviceName }
    | { type: 'setDisableMenu'; payload: boolean }
