import React from 'react'
import { Spacing } from '@ds.e/foundation'
import './Loader.scss'

export interface LoaderProps {
    hexCode?: string
    width?: keyof typeof Spacing,
    height?: keyof typeof Spacing
}

const Loader: React.FC<LoaderProps> = ({ hexCode = 'pink', width = Spacing.sm, height = Spacing.sm }) => {
    const className = `dse-width-${width} dse-height-${height}`

    return <div className={className} style={
        {
            backgroundColor: hexCode,
        }
    }>
        Loader
    </div>
}

export default Loader
