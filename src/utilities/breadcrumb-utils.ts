import { Specialty } from '@services/models/Specialty'

export type BreadcrumbTitle =
    | 'Inicio'
    | 'Medicina General'
    | 'Especialidades'
    | 'Veterinario'
    | 'Psicología'
    | 'Nutrición'
    | 'Asesoría Deportiva'
    | 'Paciente Crónico y Telemonitoreo'
    | 'Orientación en salud'
    | 'Agenda'
    | ''

export const breadcrumbTitles: Record<Specialty | string, BreadcrumbTitle> = {
    home: 'Inicio',
    GENERAL_MEDICINE: 'Medicina General',
    error: 'Especialidades',
    especialidades: 'Especialidades',
    VET: 'Veterinario',
    PSYCHOLOGY: 'Psicología',
    NUTRITION: 'Nutrición',
    SPORT: 'Asesoría Deportiva',
    CHRONIC: 'Paciente Crónico y Telemonitoreo',
    HEALTH: 'Orientación en salud',
    MYDIARY: 'Agenda',
    '': '',
}

export const getBreadcrumbTitleByURL = (title?: string): BreadcrumbTitle => {
    return title ? breadcrumbTitles[title] : ''
}
