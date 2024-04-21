import React from 'react'
import { render } from '@testing-library/react'
import { Specialty } from '@services/models/Specialty'
import { SpecialtiesSample } from '@services/specialtiesSample/SpecialtiesSampleModel'
import FeaturedServiceCard from './FeaturedServiceCard'

interface Specialties {
    specialties: SpecialtiesSample[]
}

const AllSpecialtiesResponse: Specialties = {
    specialties: [
        {
            id: 1,
            title: 'Medicina general',
            type: Specialty.GENERAL_MEDICINE,
            order: 0,
            showOnHome: true,
            businessHours: 'Atención 24 horas',
        },
        {
            id: 2,
            title: 'Psicología',
            type: Specialty.PSYCHOLOGY,
            order: 0,
            showOnHome: true,
            businessHours: 'Lun-Dom de 8 a 22h',
        },
        {
            id: 3,
            title: 'Nutrición',
            type: Specialty.NUTRITION,
            order: 0,
            showOnHome: true,
            businessHours: 'Lun-Vie de 9 a 20h. Sáb de 9 a 13h',
        },
        {
            id: 4,
            title: 'Veterinario',
            type: Specialty.VET,
            order: 0,
            showOnHome: true,
            businessHours: 'Lun-Vie de 9 a 20h. Sáb de 9 a 13h',
        },
        {
            id: 5,
            title: 'Asesoría deportiva',
            type: Specialty.SPORT,
            order: 0,
            showOnHome: true,
            businessHours: 'Lun-Vie de 9 a 20h. Sáb de 9 a 13h',
        },
        {
            id: 6,
            title: 'Paciente crónico y telemonitoreo',
            type: Specialty.CHRONIC,
            order: 0,
            showOnHome: true,
            businessHours: 'Lun-Vie de 9 a 18h. Sáb de 9 a 13h',
        },
        {
            id: 7,
            title: 'Orientación en salud',
            type: Specialty.HEALTH,
            order: 0,
            showOnHome: true,
            businessHours: 'Lun-Vie de 9 a 18h. Sáb de 9 a 13h',
        },
    ],
}

test('renders all options passed to it', () => {
    render(
        <FeaturedServiceCard
            featuredServices={AllSpecialtiesResponse.specialties}
        />,
    )
})
