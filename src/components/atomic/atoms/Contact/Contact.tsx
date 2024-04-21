import React, { CSSProperties } from 'react'
import './Contact.scss'
import WhatsappIcon from '@assetsSVG/WhatsappIcon.svg'
import PhoneIcon from '@assetsSVG/PhoneIcon.svg'

export interface ContactProps {
    className?: string
    itemClassName?: string
    type: string
    value: string
    href: string
    containerStyle?: CSSProperties
}

const ContactIconAssetMapping: any = {
    whatsapp: WhatsappIcon,
    phone: PhoneIcon,
}

const Contact: React.FC<ContactProps> = ({
    className,
    itemClassName,
    type,
    value,
    href,
    containerStyle = {},
}) => {
    return (
        <a
            href={href}
            data-testid="mo-web-contact"
            className={`mo-web-contact-container ${className}`}
            style={containerStyle}>
            <div
                data-testid="mo-web-contact-icon"
                className={`mo-web-contact-icon ${itemClassName}`}>
                <img
                    alt={type}
                    src={ContactIconAssetMapping[type]}
                />
            </div>
            <div
                data-testid="mo-web-contact-value"
                className={`mo-web-contact-icon ${itemClassName} value`}>
                {value}
            </div>
        </a>
    )
}

export default Contact
