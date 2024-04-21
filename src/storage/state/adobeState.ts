// eslint-disable-next-line import/no-cycle
import { AdobeState } from '../interfaces/adobeTypes'

const INITIAL_ADOBE_STATE: AdobeState = {
    routeSnapshot: {
        currentPage: '',
        previousPage: '/',
    },
    view: {
        date: '',
        viewName: '',
        previousPage: '/',
        currentPage: '',
        viewType: null,
    },
    business: {
        loginType: 'PIP',
        businessType: 'MO',
    },
    userData: {
        userIP: '',
        userID: '',
        userName: '',
        userMail: '',
        userPhone: '',
        userGender: '',
        userBirthday: '',
        userType: 'EB',
        rutHash: '',
        region: '',
        regionName: '',
        municipality: '',
        municipalityName: '',
        country: '',
    },
    event: null,
    error: null,
}

export default INITIAL_ADOBE_STATE
