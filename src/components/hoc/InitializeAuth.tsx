import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SplashScreen from '@atoms/SplashScreen'
import { useAppContext } from '@hooks/useAppContext'
import LocalStorage from '@storage/browser/LocalStorage'
import { useCrossTabState } from '@hooks/useCrossTabState'
import useLoadingState from '@hooks/useLoadingState'
import { usePIPCommunicationChannel } from '@hooks/usePIPCommunicationChannel'

type InitializeAuthProps = {
    children: React.ReactNode
}

export const InitializeAuth = ({ children }: InitializeAuthProps) => {
    const { appState, setUserId, setExpiredIn, setIsLoggedIn, setAccessToken } =
        useAppContext()
    const { userId, accessToken } = appState.session
    const { populateSessionState } = useCrossTabState()
    const { showLoader, hideLoader } = useLoadingState()

    const navigate = useNavigate()
    const { requestAuthentication } = usePIPCommunicationChannel()
    const storage = new LocalStorage()
    const renderLoader = () => <SplashScreen />

    const checkSessionState = () => {
        const isLoggedIn = storage.get('isLoggedIn') === 'true'
        const isLocal = window.config.APP_ENV === 'local'

        if (isLoggedIn) {
            populateSessionState()
            return
        }

        if (window.config.FEATURE_FLAGS.PIP_CONNECTION) {
            requestAuthentication()
            return
        }

        if (isLocal) {
            setUserId('169397759')
            setAccessToken('ijjdmjsjdnvhc54814')
            // TODO: add policy number to context
            return
        }

        requestAuthentication()
    }

    useEffect(() => {
        checkSessionState()
        function responseAuthenticationOrienta(event: {
            origin: any
            data: {
                message: string
                userId: string
                token: string
                policy: string
            }
        }) {
            if (event.origin === window.config.PIP_URL.slice(0, -1)) {
                if (event.data.message === 'responseAuthenticationOrienta') {
                    setUserId(event.data.userId)
                    setAccessToken(event.data.token)
                    // TODO: add policy number to context
                }
            }
        }

        window.addEventListener('message', responseAuthenticationOrienta)

        return () => {
            window.removeEventListener('message', responseAuthenticationOrienta)
        }
    }, [])

    useEffect(() => {
        if (userId && accessToken) {
            setIsLoggedIn(true)
            setExpiredIn(new Date().getTime() + 18000000)
            hideLoader()
            // TODO: unboarding logic
            setTimeout(() => {
                navigate('/home')
            }, 1000)
        }
    }, [userId, accessToken])

    if (showLoader) {
        return renderLoader()
    }

    return <>{children}</>
}
