// eslint-disable-next-line import/no-cycle
import { DeviceName } from '@ds.e/foundation'
import { AppState } from '../interfaces/types'

const INITIAL_APP_STATE: AppState = {
    lastInteraction: '',
    accessibility: {
        fontSize: 'sm',
        theme: 'main',
        speech: false,
    },
    session: {
        isReloaded: false,
        userId: null,
        userIdentityNumber: null,
        clientNumber: null,
        isLoggedIn: false,
        isAuthorize: false,
        code: null,
        accessToken: null,
        tokenType: null,
        idToken: null,
        expiredIn: null,
        lastAccess: null,
    },
    error: {
        showError: false,
        errorType: null,
        errorDescription: '',
        onButtonClick: () => {},
    },
    routeSnapshot: {
        currentPage: '/',
        prevPage: '',
    },
    adobeAnalytics: {
        previousPage: '',
    },
    configuration: {
        APP_ENV: null,
        ID_API_C: null,
        URL_ORCHESTRA: null,
        ID_APP_INSIGHT: null,
        URL_ADOBE: null,
        ENVIRONMENTORNO: null,
        VERSION: null,
        OAUTH2_URL_TOKEN: null,
        OAUTH_API_BASE_URL: null,
        OAUTH2_URL_VALIDATE_USER_INFO: null,
        API_BASE_URL: null,
        VALID_SESSION_TIME: null,
        MIS_LOGIN_URL: null,
        MIS_LOGOUT_URL: null,
        SECURITY: {
            TOKEN_OAUTH_2_USER_ID: {
                RESPONSE_TYPE: null,
                SCOPE: null,
                CLIENT_ID: null,
                REDIRECT_URI: null,
            },
        },
        FEATURE_FLAGS: {
            MOCK_ERROR_TYPE: null,
            PIP_CONNECTION: null,
            APPOINTMENT_SCHEDULER_FORCE_ERROR_NOT_AVAILABLE_APPOINTMENT: null,
            APPOINTMENT_SCHEDULER_FORCE_ERROR_NOT_AVAILABILITY: null,
        },
    },
    stopLoadingOnError: false,
    loading: null,
    showLoading: false,
    viewportSize: DeviceName.phone,
    disableMenu: false,
}

export default INITIAL_APP_STATE
