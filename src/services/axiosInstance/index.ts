import axios, { AxiosRequestConfig } from 'axios'
import LocalStorage from '@storage/browser/LocalStorage'

export const getAxiosInstance = () => {
    const storage = new LocalStorage()

    const axiosConfig: AxiosRequestConfig = {
        baseURL: window.config.API_BASE_URL,
    }

    if (window.config?.APP_ENV !== 'local') {
        axiosConfig.headers = {
            Authorization: `${storage.get('tokenType')} ${storage.get(
                'accessToken',
            )}`,
            'x-ibm-client-id': `${window.config?.SECURITY?.TOKEN_OAUTH_2_USER_ID?.CLIENT_ID}`,
        }
    }

    return axios.create(axiosConfig)
}

export const getAxiosInstanceOAUTH = () => {
    const axiosConfig: AxiosRequestConfig = {
        withCredentials: true,
        baseURL: window.config.OAUTH_API_BASE_URL,
    }

    return axios.create(axiosConfig)
}
