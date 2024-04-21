import React, { CSSProperties, useEffect, useState } from 'react'
import { useAppContext } from '@hooks/useAppContext'
import Lottie from 'react-lottie'
import { fileMapping, loadAsset } from '@utilities/assetUtilities'

import './SplashScreen.scss'

// SplashScreen component
const SplashScreen: React.FC = () => {
    // Destructure loading state and setLoading function from app context
    const {
        appState: { loading },
        setLoading,
    } = useAppContext()

    const [delayedState, setDelayedState] = useState(false)

    // Load the asset when the component mounts, and set the loading state
    useEffect(() => {
        // Load the asset only if loading state is null
        if (loading === null) {
            const fetchAsset = async () => {
                const response = await loadAsset(fileMapping.loading)
                setLoading(response)
            }

            fetchAsset()
            setTimeout(() => {
                setDelayedState(true)
            }, 3000)
        }
    }, [loading, setLoading])

    const DelayedText = ({ style }: { style: CSSProperties }) => (
        <div
            className="delayed-text"
            style={style}>
            Espera un momento. Estamos intentando entender la letra del equipo
            médico
            <span className="loading-dots" />
        </div>
    )

    return (
        <div
            className="splash-screen-section"
            data-testid="splash-screen-section">
            <div
                className="splash-screen-animation"
                data-testid="lottie-animation">
                <Lottie
                    options={{
                        loop: false,
                        autoplay: true,
                        animationData: loading,
                    }}
                />
            </div>
            <DelayedText
                style={{
                    opacity: delayedState ? 1 : 0,
                    visibility: delayedState ? 'visible' : 'hidden',
                }}
            />
        </div>
    )
}

export default SplashScreen
