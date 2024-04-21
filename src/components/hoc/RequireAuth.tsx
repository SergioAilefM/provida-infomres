import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '@hooks/useAppContext'
import { useCrossTabState } from '@hooks/useCrossTabState'
import LocalStorage from '@storage/browser/LocalStorage'

type RequireAuthProps = {
    children: React.ReactNode
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
    const storage = new LocalStorage()
    const { appState } = useAppContext()
    const { populateSessionState } = useCrossTabState()
    const location = useLocation()

    if (storage.get('isLoggedIn') === 'true') {
        if (appState.session.isLoggedIn !== true) {
            populateSessionState()
        }

        return <>{children}</>
    }
    return (
        <Navigate
            to="/logout"
            state={{ from: location }}
            replace
        />
    )
}
