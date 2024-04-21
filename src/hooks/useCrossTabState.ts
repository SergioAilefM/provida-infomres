/* eslint-disable import/no-unresolved */
import { useAppContext } from '@hooks/useAppContext'
import LocalStorage from '@storage/browser/LocalStorage'

export const useCrossTabState = () => {
    const storage = new LocalStorage()

    const {
        setUserId,
        setCode,
        setAccessToken,
        setIdToken,
        setExpiredIn,
        setIsAuthorize,
        setTokenType,
        setClientNumber,
        setIsLoggedIn,
    } = useAppContext()

    const populateSessionState = () => {
        setUserId(storage.get('userId'))
        setCode(storage.get('code'))
        setAccessToken(storage.get('accessToken'))
        setIdToken(storage.get('idToken'))
        setExpiredIn(Number(storage.get('expiredIn')))
        setTokenType(storage.get('tokenType'))
        setIsAuthorize(storage.get('IsAuthorize') === 'true')
        setClientNumber(storage.get('clientNumber'))
        setIsLoggedIn(storage.get('isLoggedIn') === 'true')
    }

    return { populateSessionState }
}
