import React from 'react'
import Footer from '@ds.e/react/lib/atomic/organisms/Footer/Footer'
import { useDisplayFooter } from '@hooks/useDisplayFooter'
import BrandLogo from 'assets/icons/BrandLogo'
import { WhatsappIcon } from 'assets/icons/WhatsappIcon'
import { PhoneIcon } from 'assets/icons/PhoneIcon'
import { useAppContext } from '@hooks/useAppContext'

import '@ds.e/scss/lib/Label.css'
import '@ds.e/scss/lib/Link.css'
import '@ds.e/scss/lib/Accordion.css'
import '@ds.e/scss/lib/Footer.css'
import './FooterWrapper.scss'

const LINKS_DATA = [
    {
        title: 'Contáctanos',
        links: [
            {
                name: '+569 9968 7935',
                ariaLabel: 'Número de Whatsapp',
                icon: <WhatsappIcon />,
                url: 'https://wa.me/+56999687935',
            },
            {
                name: '600 945 9800',
                ariaLabel: 'Número de teléfono',
                icon: <PhoneIcon />,
                url: 'tel:6009459800',
            },
        ],
    },
]

const EXTRA_LINK_DATA = [
    {
        title: '© Copyright Metlife 2020',
        ariaLabel: '© Copyright Metlife 2020',
    },
]

const FooterWrapper = () => {
    const { appState } = useAppContext()

    return useDisplayFooter() ? (
        <Footer
            linksData={LINKS_DATA}
            extraLinkData={EXTRA_LINK_DATA}
            brandLogo={<BrandLogo />}
            device={appState.viewportSize}
            accordionsAreCollapsed
        />
    ) : null
}

export default FooterWrapper
