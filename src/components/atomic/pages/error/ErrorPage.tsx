import React, { useState, useEffect } from 'react'
import DocumentTitle from 'react-document-title'
import { PAGE_TITLE } from '@constants/pageTitle'
import { Label } from '@ds.e/react/lib'
import ButtonGroup, {
    ButtonDataProps,
} from '@molecules/ButtonGroup/ButtonGroup'
import ContactGroup from '@molecules/ContactGroup'
import { ContactProps } from '@atoms/Contact/Contact'
import useDeviceSize from '@hooks/useDeviceSize'
import { useAppContext } from '@hooks/useAppContext'

import AuthErrorImageDesktop from '@assetsSVG/AuthErrorDesktop.svg'
import AuthErrorImageMobile from '@assetsSVG/AuthErrorMobile.svg'
import NotFoundErrorDesktop from '@assetsSVG/NotFoundErrorDesktop.svg'
import NotFoundErrorMobile from '@assetsSVG/NotFoundErrorMobile.svg'
import ServiceErrorDesktop from '@assetsSVG/ServiceErrorDesktop.svg'
import ServiceErrorMobile from '@assetsSVG/ServiceErrorMobile.svg'

import { JSONErrorData } from './Error.data'

import '../../templates/error/Error.scss'
import '@ds.e/scss/lib/Label.css'

type ErrorContent = {
    type: string
    title: string
    description: string
    altImage: string
    contacts: ContactProps[]
    buttonsData: ButtonDataProps[]
}

const ImageErrorAssetMapping: any = {
    'auth-failure': {
        desktop: AuthErrorImageDesktop,
        phone: AuthErrorImageMobile,
    },
    'not-found-404': {
        desktop: NotFoundErrorDesktop,
        phone: NotFoundErrorMobile,
    },
    'mo-service-error': {
        desktop: ServiceErrorDesktop,
        phone: ServiceErrorMobile,
    },
}

const DeviceNormalizationMapping: any = {
    phone: 'phone',
    tablet: 'phone',
    laptop: 'desktop',
    desktop: 'desktop',
}

const ErrorPage = () => {
    const [errorContentJSON, setErrorContentJSON] = useState<any>(JSONErrorData)
    const [currentErrorContent, setCurrentErrorContent] =
        useState<ErrorContent | null>(null)
    const device = useDeviceSize()
    const [errorImage, setErrorImage] = useState<any>(null)
    const {
        appState: {
            error: { errorType },
        },
    } = useAppContext()

    useEffect(() => {
        if (errorType && device) {
            setCurrentErrorContent(errorContentJSON[errorType])
            const deviceNormalization: string =
                DeviceNormalizationMapping[device]
            setErrorImage(
                ImageErrorAssetMapping[errorType][deviceNormalization],
            )
        }
    }, [errorType, device])

    useEffect(() => {
        setTimeout(() => {
            window.location.replace('http://pipdev.metlife.cl/')
        }, 3000)
    }, [])

    return (
        <DocumentTitle title={PAGE_TITLE.ERROR}>
            <div
                data-testid="mo-web-error-page-container"
                className="mo-web-error-page-container">
                <div
                    data-testid="mo-web-error-page-subcontainer"
                    className="mo-web-error-page-subcontainer">
                    <div
                        data-testid="mo-web-error-page-left-section"
                        className="mo-web-error-page-left-section">
                        <Label
                            as="h4"
                            data-testid="mo-web-error-page-left-section-title"
                            className="mo-web-error-page-left-section-title">
                            {currentErrorContent?.title}
                        </Label>
                        <div>
                            <Label
                                as="p"
                                data-testid="mo-web-error-page-left-section-content"
                                className="mo-web-error-page-left-section-content">
                                {currentErrorContent?.description}
                            </Label>
                        </div>
                        <ContactGroup
                            data-testid="mo-web-error-page-left-section-contact-container"
                            className="mo-web-error-page-left-section-contact-container"
                            contactData={currentErrorContent?.contacts}
                            contactItemClassName="mo-web-error-page-left-section-contact-container-single"
                        />
                        {!!currentErrorContent?.buttonsData && (
                            <ButtonGroup
                                data-testid="mo-web-error-page-left-section-cta-container"
                                className="mo-web-error-page-left-section-cta-container"
                                buttonsData={currentErrorContent.buttonsData}
                            />
                        )}
                    </div>
                    <div
                        data-testid="mo-web-error-page-right-section"
                        className="mo-web-error-page-right-section">
                        {errorImage && (
                            <img
                                data-testid="mo-web-error-page-right-section-image"
                                className="mo-web-error-page-right-section-image"
                                src={errorImage}
                                alt={currentErrorContent?.altImage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}

export default ErrorPage
