/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SessionTimeoutCountdown from '@ds.e/react/lib/atomic/organisms/SessionTimeoutCountdown'
import '@ds.e/scss/lib/SessionTimeoutCountdown.css'

import { useAppContext } from '@hooks/useAppContext'
import { useInitSiteMinderSession } from '@services/useInitSiteMinderSession'

// eslint-disable-next-line @typescript-eslint/naming-convention
type SessionTimeOutPros = {
    children: JSX.Element | JSX.Element[]
}

export const SessionTimeOut = ({ children }: SessionTimeOutPros) => {
    const { appState, setAccessToken, setIdToken, setExpiredIn, setTokenType } =
        useAppContext()
    const { session, viewportSize } = appState
    const [countDown, setCountDown] = useState(-1)
    const [showCountDownModal, setShowCountDownModal] = useState(false)
    const { callToken, logOut } = useInitSiteMinderSession()
    const [isLogOut, setIsLogOut] = useState(false)
    const navigate = useNavigate()
    const PROMPT_TIME = 30
    const INACTIVITY_TIME = 300000
    let counter: string | number | NodeJS.Timeout | undefined
    const {
        session: { userId, clientNumber },
    } = appState

    const analyticsPageName = 'Sucursal Virtual: Time Out'

    const handleStillApp = () => {
        if (window.location.hostname !== 'localhost') {
            callToken()
                .then(response => {
                    setAccessToken(response.data?.access_token)
                    setIdToken(response.data?.id_token)
                    setExpiredIn(
                        new Date().getTime() + response.data?.expires_in * 1000,
                    )
                    setTokenType(response.data?.token_type)
                })
                .catch(error => {
                    console.error(error)
                })
        } else {
            navigate('/')
        }
    }

    const sessionInactivityLogOut = () => {
        logOut()
    }

    const handleOnIdle = () => {
        setShowCountDownModal(false)
        sessionInactivityLogOut()
        setCountDown(-1)
        clearTimeout(counter)
    }

    const handleOnPrompt = () => {
        setCountDown(PROMPT_TIME)
        setShowCountDownModal(true)
        clearTimeout(counter)
    }

    const handleOnActive = () => {
        setShowCountDownModal(false)
        setCountDown(-1)
        clearTimeout(counter)
    }

    useEffect(() => {
        if (session.expiredIn) {
            setInterval(() => {
                const time = new Date().getTime()
                if (time) {
                    if (time + PROMPT_TIME * 1000 >= session.expiredIn!) {
                        logOut()
                        // handleOnPrompt()
                    }
                }
            }, 30000)
        }
    }, [session.expiredIn])

    useEffect(() => {
        if (countDown !== -1) {
            if (countDown === 0) {
                handleOnIdle()
            }
            if (countDown <= PROMPT_TIME) {
                counter = setTimeout(() => {
                    setCountDown(countDown - 1)
                }, 1000)
            }
        }
    }, [countDown])

    useEffect(() => {
        setInterval(() => {
            if (
                JSON.parse(window.localStorage.getItem('lastInteraction')!) +
                    INACTIVITY_TIME -
                    Date.now() <=
                0
            ) {
                handleOnPrompt()
            }
        }, 60000)

        const checkUserData = () => {
            const isLoggedIn = window.localStorage.getItem('isLoggedIn')
            setIsLogOut(isLoggedIn ? JSON.parse(isLoggedIn) : null)
        }

        const trackLastInteraction = () => {
            window.localStorage.setItem(
                'lastInteraction',
                JSON.stringify(Date.now()),
            )
        }

        const isMobileView = viewportSize === ('tablet' || 'phone')

        if (isMobileView) {
            window.addEventListener('touchend', trackLastInteraction)
            window.addEventListener('touchmove', trackLastInteraction)
        } else {
            window.addEventListener('click', trackLastInteraction)
            window.addEventListener('mousemove', trackLastInteraction)
        }

        window.addEventListener('storage', checkUserData)
        return () => {
            if (isMobileView) {
                window.removeEventListener('touchmove', trackLastInteraction)
                window.removeEventListener('touchend', trackLastInteraction)
            } else {
                window.removeEventListener('mousemove', trackLastInteraction)
                window.removeEventListener('click', trackLastInteraction)
            }
            window.removeEventListener('storage', checkUserData)
        }
    }, [])

    useEffect(() => {
        if (isLogOut === null) logOut()
    }, [isLogOut])

    return (
        <>
            {showCountDownModal ? (
                <SessionTimeoutCountdown
                    showTimeoutModal={showCountDownModal}
                    remainingSeconds={`${countDown}`}
                    onContinueButtonClick={handleOnActive}
                    onSignOffButtonClick={handleOnIdle}
                />
            ) : null}
            {children}
        </>
    )
}
