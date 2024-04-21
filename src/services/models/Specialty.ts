// TODO: UPDATE WITH REAL TYPES

export enum Specialty {
    GENERAL_MEDICINE = 'GENERAL_MEDICINE',
    VET = 'VET',
    PSYCHOLOGY = 'PSYCHOLOGY',
    NUTRITION = 'NUTRITION',
    SPORT = 'SPORT',
    HEALTH = 'HEALTH',
    CHRONIC = 'CHRONIC',
    UNDEFINED = 'UNDEFINED',
}

export const Specialties: Record<Specialty, string> = {
    GENERAL_MEDICINE: 'medicinageneral',
    VET: 'veterinario',
    PSYCHOLOGY: 'psicologia',
    NUTRITION: 'nutricion',
    SPORT: 'asesoriadeportiva',
    HEALTH: 'orientacionsalud',
    CHRONIC: 'pacientecronico',
    UNDEFINED: '',
}
