import React, { useReducer, ReactNode, useMemo } from 'react'

import { DeviceName } from '@ds.e/foundation'

import {
    AdobeAnalytics,
    Configuration,
    Error,
    RouteSnapshot,
} from '../interfaces/types'
import INITIAL_APP_STATE from '../state/appState'
import AppContext from './AppContext'

import { appStateReduces } from './AppContextReducer'

interface AppContextProviderProps {
    children: ReactNode // Define the children prop type as ReactNode
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
}) => {
    const [appState, dispatch] = useReducer(appStateReduces, INITIAL_APP_STATE)

    const setLastInteraction = (date: string) => {
        dispatch({ type: 'lastInteraction', payload: date })
    }

    const setCode = (code: string | null) => {
        dispatch({ type: 'setCode', payload: code })
    }

    const setAdobeAnalytics = (adobeAnalytics: AdobeAnalytics) => {
        dispatch({ type: 'setAdobeAnalytics', payload: adobeAnalytics })
    }

    const setConfiguration = (configuration: Configuration) => {
        dispatch({ type: 'setConfiguration', payload: configuration })
    }

    const setIsReloaded = (isReloaded: boolean) => {
        dispatch({ type: 'setIsReloaded', payload: isReloaded })
    }

    const setIsLoggedIn = (isLoggedIn: boolean | null) => {
        dispatch({ type: 'setIsLoggedIn', payload: isLoggedIn })
    }

    const setIsAuthorize = (isAuthorize: boolean | null) => {
        dispatch({ type: 'setIsAuthorize', payload: isAuthorize })
    }

    const setUserId = (userId: string | null) => {
        dispatch({ type: 'setUserId', payload: userId })
    }

    const setUserIdentityNumber = (userId: string | null) => {
        dispatch({ type: 'setUserIdentityNumber', payload: userId })
    }

    const setClientNumber = (clientNumber: string | null) => {
        dispatch({ type: 'setClientNumber', payload: clientNumber })
    }

    const setAccessToken = (accessToken: string | null) => {
        dispatch({ type: 'setAccessToken', payload: accessToken })
    }

    const setIdToken = (idToken: string | null) => {
        dispatch({ type: 'setIdToken', payload: idToken })
    }

    const setTokenType = (tokenType: string | null) => {
        dispatch({ type: 'setTokenType', payload: tokenType })
    }

    const setExpiredIn = (expiredIn: number | null) => {
        dispatch({ type: 'setExpiredIn', payload: expiredIn })
    }

    const setError = (error: Error) => {
        dispatch({ type: 'setError', payload: error })
    }

    const removeError = () => {
        dispatch({ type: 'removeError' })
    }

    const setStopLoadingOnError = (stopLoading: boolean) => {
        dispatch({ type: 'stopLoadingOnError', payload: stopLoading })
    }

    const setLoading = (loading: any) => {
        dispatch({ type: 'setLoading', payload: loading })
    }

    const setShowLoading = (showLoading: boolean) => {
        dispatch({ type: 'setShowLoading', payload: showLoading })
    }

    const setViewportSize = (viewportSize: DeviceName) => {
        dispatch({ type: 'setViewportSize', payload: viewportSize })
    }

    const setDisableMenu = (disableMenu: boolean) => {
        dispatch({ type: 'setDisableMenu', payload: disableMenu })
    }

    const setRouteSnapshot = (routeSnapshot: RouteSnapshot) => {
        dispatch({ type: 'setRouteSnapshot', payload: routeSnapshot })
    }

    const setAppointmentSchedulerStep = (step: number) => {
        dispatch({ type: 'setAppointmentSchedulerStep', payload: step })
    }

    const setAppointmentSchedulerFormData = (data: any) => {
        dispatch({ type: 'setAppointmentSchedulerFormData', payload: data })
    }

    const resetAppointmentSchedulerState = () => {
        dispatch({
            type: 'resetAppointmentSchedulerState',
            payload: null,
        })
    }

    const contextValue = {
        appState,
        setLastInteraction,
        setIsReloaded,
        setAppointmentSchedulerStep,
        setAppointmentSchedulerFormData,
        setIsLoggedIn,
        setIsAuthorize,
        setUserId,
        setUserIdentityNumber,
        setClientNumber,
        setCode,
        setAccessToken,
        setIdToken,
        setTokenType,
        setExpiredIn,
        setError,
        removeError,
        setAdobeAnalytics,
        setConfiguration,
        setStopLoadingOnError,
        setLoading,
        setShowLoading,
        setViewportSize,
        setRouteSnapshot,
        setDisableMenu,
    }

    // Wrap the context value object in a useMemo hook
    const memoizedContextValue = useMemo(
        () => contextValue,
        [
            appState,
            setLastInteraction,
            setIsReloaded,
            setAppointmentSchedulerStep,
            setAppointmentSchedulerFormData,
            setIsLoggedIn,
            setIsAuthorize,
            setUserId,
            setUserIdentityNumber,
            setClientNumber,
            setCode,
            setAccessToken,
            setIdToken,
            setTokenType,
            setExpiredIn,
            setError,
            removeError,
            setAdobeAnalytics,
            setConfiguration,
            setStopLoadingOnError,
            setLoading,
            setShowLoading,
            setViewportSize,
            setRouteSnapshot,
            setDisableMenu,
        ],
    )
    return (
        <AppContext.Provider value={memoizedContextValue}>
            {children}
        </AppContext.Provider>
    )
}
