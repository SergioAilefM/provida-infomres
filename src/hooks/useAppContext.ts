import { useContext } from 'react'

import AppContext from '@storage/context/AppContext'

export const useAppContext = () => {
    const {
        appState,
        setLastInteraction,
        setCode,
        setAccessToken,
        setUserId,
        setClientNumber,
        setIdToken,
        setTokenType,
        setExpiredIn,
        setIsReloaded,
        setIsAuthorize,
        setIsLoggedIn,
        setError,
        removeError,
        setAdobeAnalytics,
        setConfiguration,
        setStopLoadingOnError,
        setLoading,
        setShowLoading,
        //setViewportSize,
        setDisableMenu,
        setRouteSnapshot,
    } = useContext(AppContext)

    return {
        appState,
        setCode,
        setLastInteraction,
        setAccessToken,
        setUserId,
        setClientNumber,
        setIdToken,
        setTokenType,
        setExpiredIn,
        setIsReloaded,
        setIsAuthorize,
        setIsLoggedIn,
        setError,
        removeError,
        setAdobeAnalytics,
        setConfiguration,
        setStopLoadingOnError,
        setLoading,
        setShowLoading,
       // setViewportSize,
        setDisableMenu,
        setRouteSnapshot,
    }
}
