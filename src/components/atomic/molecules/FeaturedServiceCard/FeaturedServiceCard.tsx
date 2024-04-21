import React, { useCallback } from 'react'
import { InfoCard } from '@ds.e/react'
import '@ds.e/scss/lib/InfoCard.css'
import './FeaturedServiceCard.scss'
import { useNavigate } from 'react-router-dom'
import { SpecialtiesSample } from '@services/specialtiesSample/SpecialtiesSampleModel'
import { PATHS } from '@constants/paths'
import { getIcon } from '@utilities/home-utils'

const CLASSNAME = 'mo-featured-service'

const ALL_CARD: SpecialtiesSample = {
    id: 9999,
    title: 'Todas las atenciones',
    type: 'ALL',
    order: 9999,
    businessHours: '',
    showOnHome: true,
}

export type FeaturedServiceCardProps = {
    featuredServices: SpecialtiesSample[]
    redirectCallback?: () => void
}

const FeaturedServiceCard = ({
    featuredServices,
    redirectCallback = () => {},
}: FeaturedServiceCardProps) => {
    const navigation = useNavigate()

    const redirectToRoute = useCallback(
        (routeName: string) => {
            navigation(routeName)
        },
        [navigation],
    )

    const handleRedirectToRoute = (type: string, id: number) => {
        if (id === 1) {
            redirectCallback()
        } else {
            redirectToRoute(
                type === 'ALL'
                    ? `${PATHS.SPECIALTIES}`
                    : `${PATHS.SPECIALTIES}/${id}`,
            )
        }
    }

    const addAllSpecialties = [...featuredServices, ALL_CARD]

    return (
        <div className={`${CLASSNAME}-card-container`}>
            {addAllSpecialties
                .sort((a, b) => a.order - b.order)
                .filter(service => service.showOnHome === true)
                .map(({ id, title, type }, index) => (
                    <div
                        className={`${CLASSNAME}-card-wrapper`}
                        key={`${id}-container`}
                        role="button"
                        onKeyDown={() => handleRedirectToRoute(type, id)}
                        tabIndex={index}
                        onClick={() => handleRedirectToRoute(type, id)}>
                        <InfoCard.Card
                            key={id}
                            className={`${CLASSNAME}-card`}>
                            <InfoCard.Content
                                className={
                                    index === 0
                                        ? `${CLASSNAME}-card-special`
                                        : `${CLASSNAME}-card-normal`
                                }>
                                <div
                                    className={`${CLASSNAME}-card-content-title`}>
                                    {id !== 1 ? title : `${title} inmediata`}{' '}
                                </div>
                                <div
                                    className={`${CLASSNAME}-card-content-icon-container`}>
                                    <div
                                        className={`${CLASSNAME}-card-content-icon-container-relative`}>
                                        <img
                                            src={getIcon(type) || ''}
                                            alt={type}
                                        />
                                    </div>
                                </div>
                            </InfoCard.Content>
                        </InfoCard.Card>
                    </div>
                ))}
        </div>
    )
}

export default FeaturedServiceCard
