import { Specialty } from '@services/models/Specialty'
import React from 'react'

const GeneralPhysician = React.lazy(
    () => import('assets/icons/GeneralPhysician'),
)
const Vet = React.lazy(() => import('assets/icons/Vet'))
const Psychology = React.lazy(() => import('assets/icons/Psychology'))
const Nutrition = React.lazy(() => import('assets/icons/Nutrition'))
const Chronic = React.lazy(() => import('assets/icons/Chronic'))
const Health = React.lazy(() => import('assets/icons/Health'))
const Sport = React.lazy(() => import('assets/icons/Sport'))

const getIcon = (specialty: Specialty | string) => {
    switch (specialty) {
        case Specialty.VET:
            return <Vet />
        case Specialty.CHRONIC:
            return <Chronic />
        case Specialty.HEALTH:
            return <Health />
        case Specialty.PSYCHOLOGY:
            return <Psychology />
        case Specialty.NUTRITION:
            return <Nutrition />
        case Specialty.SPORT:
            return <Sport />
        case Specialty.GENERAL_MEDICINE:
            return <GeneralPhysician />
        default:
            return null
    }
}

export { getIcon }
