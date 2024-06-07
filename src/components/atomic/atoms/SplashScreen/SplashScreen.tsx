import React from 'react'
import { Spacing } from '@ds.e/foundation'
import './SplashScreen.scss'

export interface SplashScreenProps {
    hexCode?: string
    width?: keyof typeof Spacing,
    height?: keyof typeof Spacing
}

const SplashScreen: React.FC<SplashScreenProps> = ({ hexCode = 'pink', width = Spacing.sm, height = Spacing.sm }) => {
    const className = `dse-width-${width} dse-height-${height}`

    return <div className={className} style={
        {
            backgroundColor: hexCode,
        }
    }>
        SplashScreen
    </div>
}

export default SplashScreen
