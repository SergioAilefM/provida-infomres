export type Path =
    | '/home'
    | '/'
    | '/especialidades'
    | '/error'
    | '/miagenda'
    | '/agendar'
    | '/agendarconsulta'
    | '/provisory-pip'
    | '/especialidades/:specialtyId'
// PAGE PATHS TYPE DECLARATIONS

export const PATHS: Record<string, Path> = {
    HOME: '/home',
    ROOT: '/',
    SPECIALTIES: '/especialidades',
    ERROR: '/error',
    BOOKING: '/agendarconsulta',
    PROVISORY_PIP: '/provisory-pip',
    APPOINTMENT_SCHEDULER: '/agendar',
    SPECIALTY_DETAIL: '/especialidades/:specialtyId',
    MYDIARY: '/miagenda',
    // PAGE PATHS DECLARATIONS
}
