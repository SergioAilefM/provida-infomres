import All from '@assetsSVG/All.svg'
import Sport from '@assetsSVG/Sport.svg'
import Veterinaria from '@assetsSVG/Veterinaria.svg'
import Nutricion from '@assetsSVG/Nutricion.svg'
import Psicologia from '@assetsSVG/Psicologia.svg'
import MedicinaGeneral from '@assetsSVG/MedicinaGeneral.svg'
import { Specialty } from '@services/models/Specialty'

export const getIcon = (specialty: string) => {
    switch (specialty) {
        case Specialty.GENERAL_MEDICINE:
            return MedicinaGeneral
        case Specialty.VET:
            return Veterinaria
        case Specialty.HEALTH:
            return MedicinaGeneral
        case Specialty.PSYCHOLOGY:
            return Psicologia
        case Specialty.NUTRITION:
            return Nutricion
        case Specialty.SPORT:
            return Sport
        case 'ALL':
            return All
        default:
            return null
    }
}
