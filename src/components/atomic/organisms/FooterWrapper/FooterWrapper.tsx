import React from 'react'
import { Spacing } from '@ds.e/foundation'
import './FooterWrapper.scss'

export interface FooterWrapperProps {
    hexCode?: string
    width?: keyof typeof Spacing,
    height?: keyof typeof Spacing
}

const FooterWrapper: React.FC<FooterWrapperProps> = ({ hexCode = 'pink', width = Spacing.sm, height = Spacing.sm }) => {
    const className = `dse-width-${width} dse-height-${height}`

    return <div className={className} style={
        {
            backgroundColor: hexCode,
        }
    }>
        FooterWrapper
    </div>
}

export default FooterWrapper
