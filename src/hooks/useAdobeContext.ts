import { useContext } from 'react'

import AdobeContext from '@storage/context/AdobeContext'

export const useAdobeContext = () => {
    const {
        adobeState,
        setUserIP,
        setView,
        setBusiness,
        setUser,
        setError,
        removeError,
        setEvent,
        removeEvent,
        setRouteSnapshot,
    } = useContext(AdobeContext)

    return {
        adobeState,
        setUserIP,
        setView,
        setBusiness,
        setUser,
        setError,
        removeError,
        setEvent,
        removeEvent,
        setRouteSnapshot,
    }
}
