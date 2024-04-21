import React, { CSSProperties, useCallback } from 'react'
import { Button } from '@ds.e/react'
import '@ds.e/scss/lib/Button.css'
import './ButtonGroup.scss'
import { useNavigate } from 'react-router-dom'

export interface ButtonDataProps {
    className?: string
    label?: string
    eventHandler: (event?: any) => void | any
    buttonType:
        | 'text'
        | 'fill'
        | 'fillDark'
        | 'fillWhite'
        | 'outline'
        | 'outlineDark'
        | 'outlineWhite'
        | undefined
    routeName?: string
}
export interface ButtonGroupProps {
    'data-testid'?: string
    className?: string
    containerStyle?: CSSProperties
    buttonsData: ButtonDataProps[]
    reverseRowOnMobile?: boolean
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    'data-testid': dataTestId,
    className = '',
    containerStyle = {},
    buttonsData,
    reverseRowOnMobile = false,
}: ButtonGroupProps) => {
    const navigation = useNavigate()

    const getHandler = (buttonData: ButtonDataProps) => {
        if (buttonData?.routeName) {
            return navigation(buttonData.routeName!)
        }
        return buttonData.eventHandler()
    }

    const hanbleButtonClick = useCallback(
        (buttonData: ButtonDataProps) => {
            getHandler(buttonData)
        },
        [navigation],
    )

    return (
        <div
            data-testid={dataTestId || 'mo-web-button-group'}
            className={`mo-web-button-group ${className} ${
                reverseRowOnMobile ? 'row-reverse' : ''
            }`}
            style={containerStyle}>
            {buttonsData &&
                buttonsData.length > 0 &&
                buttonsData.map((buttonData: ButtonDataProps) => (
                    <Button
                        key={`mo-web-button-group-${buttonData?.label}-${buttonData?.buttonType}`}
                        className={buttonData?.className}
                        label={buttonData?.label}
                        onClick={() => hanbleButtonClick(buttonData)}
                        buttonType={buttonData?.buttonType}
                    />
                ))}
        </div>
    )
}

export default ButtonGroup
