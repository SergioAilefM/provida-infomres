import React, { useReducer, ReactNode, useMemo } from 'react'

import {
    ViewData,
    BusinessData,
    UserData,
    ErrorData,
    EventData,
    RouteSnapshot,
} from '../interfaces/adobeTypes'
import INITIAL_ADOBE_STATE from '../state/adobeState'
import AdobeContext from './AdobeContext'
import { adobeStateReducer } from './AdobeContextReducer'

interface AdobeContextProviderProps {
    children: ReactNode // Define the children prop type as ReactNode
}

export const AdobeContextProvider: React.FC<AdobeContextProviderProps> = ({
    children,
}) => {
    const [adobeState, dispatch] = useReducer(
        adobeStateReducer,
        INITIAL_ADOBE_STATE,
    )

    const setUserIP = (userIP: string) => {
        dispatch({ type: 'setUserIP', payload: userIP })
    }

    const setView = (view: ViewData) => {
        dispatch({ type: 'setView', payload: view })
    }

    const setBusiness = (business: BusinessData) => {
        dispatch({ type: 'setBusiness', payload: business })
    }

    const setUser = (user: UserData) => {
        dispatch({ type: 'setUser', payload: user })
    }

    const setError = (error: ErrorData) => {
        dispatch({ type: 'setError', payload: error })
    }
    const removeError = () => {
        dispatch({ type: 'removeError' })
    }
    const setEvent = (event: EventData) => {
        dispatch({ type: 'setEvent', payload: event })
    }
    const removeEvent = () => {
        dispatch({ type: 'removeEvent' })
    }
    const setRouteSnapshot = (routeSnapShot: RouteSnapshot) => {
        dispatch({ type: 'setRouteSnapshot', payload: routeSnapShot })
    }

    const contextValue = {
        adobeState,
        setUserIP,
        setView,
        setBusiness,
        setUser,
        setEvent,
        removeEvent,
        setError,
        removeError,
        setRouteSnapshot,
    }

    // Wrap the context value object in a useMemo hook
    const memoizedContextValue = useMemo(
        () => contextValue,
        [
            adobeState,
            setUserIP,
            setView,
            setBusiness,
            setUser,
            setEvent,
            removeEvent,
            setError,
            removeError,
            setRouteSnapshot,
        ],
    )
    return (
        <AdobeContext.Provider value={memoizedContextValue}>
            {children}
        </AdobeContext.Provider>
    )
}
