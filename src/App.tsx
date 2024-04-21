import React, { useEffect, useState } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useLocation } from 'react-router-dom'

import FooterWrapper from '@organisms/FooterWrapper/FooterWrapper'
import { InitializeAuth } from '@hoc/InitializeAuth'
import { useAppContext } from '@hooks/useAppContext'
import { useAdobeContext } from '@hooks/useAdobeContext'
import { useAdobeAnalytics } from '@hooks/useAdobeAnalytics'
import useDeviceSize from '@hooks/useDeviceSize'
import LocalStorage from '@storage/browser/LocalStorage'
import HeaderWrapper from '@organisms/HeaderWrapper/HeaderWrapper'

import { getUserFontSize } from '@utilities/index'
import AppRoutes from './AppRoutes'

import './scss/App.scss'

const App = () => {
    const location = useLocation()
    const device = useDeviceSize()
    const { setConfiguration, setViewportSize, setLastInteraction } =
        useAppContext()
    const { adobeState } = useAdobeContext()
    const { view: adobeView, error: adobeError, event: adobeEvent } = adobeState
    const { recorder, registerRouteSnapshot } = useAdobeAnalytics()
    const [isMenuOpen, setMenuOpen] = useState(true)

    const storage = new LocalStorage()

    useEffect(() => {
        if (adobeView) recorder()
        if (adobeError !== null || adobeEvent !== null) {
            recorder()
        }
    }, [adobeView, adobeError, adobeEvent])

    useEffect(() => {
        registerRouteSnapshot(
            location.pathname,
            adobeState.routeSnapshot.currentPage,
        )
        setViewportSize(device)
    }, [location, device])

    useEffect(() => {
        const defaultUserFontSize = storage.get('userFontSize')
        if (defaultUserFontSize) {
            const htmlTag = document.documentElement
            htmlTag.style.fontSize = getUserFontSize(defaultUserFontSize)
        }

        setLastInteraction(JSON.stringify(Date.now()))
        setConfiguration(window.config)

        if (navigator.userAgent.includes('Mac')) {
            document.body.classList.add('os-mac')
        }
    }, [])

    return (
        <div className="APP_NAME">
            <InitializeAuth>
                <HeaderWrapper
                    showMenu
                    setMenuOpen={setMenuOpen}
                />
                <main>
                    <AppRoutes />
                </main>
                <FooterWrapper />
                <ReactQueryDevtools />
            </InitializeAuth>
        </div>
    )
}

export default App
