import React, { CSSProperties } from 'react'
import './ContactGroup.scss'
import Contact, { ContactProps } from '@atoms/Contact/Contact'

export interface ContactGroupProps {
    className?: string
    'data-testid'?: string
    contactContainerClassName?: string
    contactItemClassName?: string
    containerStyle?: CSSProperties
    contactContainerStyle?: CSSProperties
    contactData?: ContactProps[]
}

const ContactGroup: React.FC<ContactGroupProps> = ({
    'data-testid': dataTestId,
    className = '',
    contactContainerClassName = '',
    contactItemClassName = '',
    containerStyle = {},
    contactContainerStyle = {},
    contactData,
}: ContactGroupProps) => {
    return (
        <div
            data-testid={dataTestId || 'mo-web-contact-group'}
            className={`mo-web-contact-group ${className}`}
            style={containerStyle}>
            {contactData &&
                contactData.length > 0 &&
                contactData.map((contact: ContactProps) => (
                    <Contact
                        className={contactContainerClassName}
                        itemClassName={contactItemClassName}
                        key={`contact-type-${contact?.type}`}
                        type={contact?.type}
                        value={contact?.value}
                        href={contact?.href}
                        containerStyle={contactContainerStyle}
                    />
                ))}
        </div>
    )
}

export default ContactGroup
