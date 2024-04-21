import { ContactProps } from '@atoms/Contact/Contact'
import { ButtonDataProps } from '@molecules/ButtonGroup/ButtonGroup'
import { ErrorType } from '@storage/interfaces/types'

export type ErrorContent = {
    title: string
    description: string
    altImage: string
    contacts: ContactProps[]
    buttonsData: ButtonDataProps[]
}

export const JSONErrorData: Record<ErrorType, ErrorContent> = {
    'auth-failure': {
        title: 'Tu sesión se quedó dormida',
        description:
            'Para despertarla, inicia sesión nuevamente en tu Portal de Clientes. Con esta medida de seguridad protegemos tus datos y tu privacidad.',
        altImage: 'Error de Sesión',
        contacts: [],
        buttonsData: [
            {
                className: 'mo-web-error-page-left-section-cta',
                label: 'Ir a Portal de Clientes',
                routeName: '/provisory-pip',
                eventHandler: navigateToUrl => navigateToUrl(),
                buttonType: 'fill',
            },
        ],
    },
    'not-found-404': {
        title: 'Lo sentimos, algo salió mal',
        description:
            'Parece que este enlace se ha tomado un descanso y no responde a nuestros llamados. Vuelve al inicio e intenta nuevamente.\n\nO Puedes contactarnos a través de los canales de atención de MetLife Orienta:',
        altImage: 'No se ha encontrado',
        contacts: [
            {
                type: 'whatsapp',
                value: '+569 9968 7935',
                href: 'https://wa.me/+56999687935',
            },
            { type: 'phone', value: '600 945 9800', href: 'tel:6009459800' },
        ],
        buttonsData: [
            {
                className: 'mo-web-error-page-left-section-cta row-reverse',
                label: 'Ir a la página principal',
                routeName: '/home',
                eventHandler: navigateToUrl => navigateToUrl(),
                buttonType: 'fill',
            },
        ],
    },
    'mo-service-error': {
        title: 'Estaremos de vuelta enseguida',
        description:
            'A MetLife Orienta le bajó la presión y no se siente muy bien. Estamos trabajando para que se recupere lo antes posible.\n\nPuedes contactarnos a través de los canales de atención de MetLife Orienta:',
        altImage: 'Error inesperado',
        contacts: [
            {
                type: 'whatsapp',
                value: '+569 9968 7935',
                href: 'https://wa.me/+56999687935',
            },
            { type: 'phone', value: '600 945 9800', href: 'tel:6009459800' },
        ],
        buttonsData: [
            {
                className:
                    'mo-web-error-page-left-section-cta row-reverse link-button mo-service-error-case',
                label: 'Volver a intentar',
                routeName: '/home',
                eventHandler: navigateToUrl => navigateToUrl(),
                buttonType: 'fill',
            },
            {
                className:
                    'mo-web-error-page-left-section-cta row-reverse link-button mo-service-error-case',
                label: 'Ir al Portal de Clientes',
                routeName: '/provisory-pip',
                eventHandler: navigateToUrl => navigateToUrl(),
                buttonType: 'text',
            },
        ],
    },
}
