import { Category } from './Menu.types'

export const CategoriesMockData: Category[] = [
    {
        name: 'Agenda',
        nameAriaLabel: 'Agenda',
        url: '/miagenda',
        urlAriaLabel: 'Mi Agenda',
        featured: {
            name: 'Especialidades',
            nameAriaLabel: 'Especialidades',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat imperdiet erat id cursus. Duis ut lorem elit. Integer sit amet tellus id felis luctus laoreet et sit amet turpis.',
            descriptionAriaLabel:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat imperdiet erat id cursus. Duis ut lorem elit. Integer sit amet tellus id felis luctus laoreet et sit amet turpis.',
            url: '/especialidades',
            urlAriaLabel: 'Ver todas las especialidades',
            ctaText: 'Ingresar',
            ctaTextAriaLabel: 'Ingresar',
        },
        subCategories: undefined,
    },
    {
        name: 'Especialidades',
        nameAriaLabel: 'Especialidades',
        url: '/especialidades',
        urlAriaLabel: 'Todas las especialidades',
        specialDisplay: true,
        featured: {
            name: 'Especialidades',
            nameAriaLabel: 'Especialidades',
            description:
                'Revisa toda la información que necesitas sobre nuestras especialidades disponibles.',
            descriptionAriaLabel:
                'Revisa toda la información que necesitas sobre nuestras especialidades disponibles.',
            url: '/especialidades',
            urlAriaLabel: '#',
            ctaText: 'Ver todas',
            ctaTextAriaLabel: 'Ver todas',
        },
        subCategories: [
            {
                name: 'Medicina general',
                nameAriaLabel: 'Medicina general',
                url: '/especialidades/medicinageneral',
                urlAriaLabel: 'Medicina General',
            },
            {
                name: 'Psicología',
                nameAriaLabel: 'Psicología',
                url: '/especialidades/psicologia',
                urlAriaLabel: 'Psicologia',
            },
            {
                name: 'Nutrición',
                nameAriaLabel: 'Nutrición',
                url: '/especialidades/nutricion',
                urlAriaLabel: 'Nutricion',
            },
            {
                name: 'Veterinaria',
                nameAriaLabel: 'Veterinaria',
                url: '/especialidades/veterinario',
                urlAriaLabel: 'Veterinario',
            },
            {
                name: 'Asesoría deportiva',
                nameAriaLabel: 'Asesoría deportiva',
                url: '/especialidades/asesoriadeportiva',
                urlAriaLabel: 'Asesoria Deportiva',
            },
            {
                name: 'Paciente crónico y telemonitoreo',
                nameAriaLabel: 'Paciente crónico y telemonitoreo',
                url: '/especialidades/pacientecronico',
                urlAriaLabel: 'Especialidad paciente cronico y telemonitoreo',
            },
            {
                name: 'Orientación en salud',
                nameAriaLabel: 'Orientación en salud',
                url: '/especialidades/orientacionsalud',
                urlAriaLabel: 'Especialidad Orientacion en Salud',
            },
            {
                name: 'Ver todas',
                nameAriaLabel: 'Ver todas',
                url: '/especialidades',
                urlAriaLabel: 'Ver todas las especialidades',
                notShowOnDevices: ['laptop', 'desktop'],
            },
        ],
    },
]
