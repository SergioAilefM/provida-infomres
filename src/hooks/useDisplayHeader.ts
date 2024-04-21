import { useLocation } from 'react-router-dom'
import { ROUTES_WITHOUT_HEADER } from '@constants/header'

export const useShouldDisplayHeader = () => {
    const location = useLocation()
    return ROUTES_WITHOUT_HEADER.every(el => !location.pathname.includes(el))
}

export const useDisplayHeader = () => {
    const location = useLocation()

    const toShowFooter = () => {
        if (location.pathname === '/') return null
        return true
    }

    return (
        ROUTES_WITHOUT_HEADER.every(el => !location.pathname.includes(el)) &&
        toShowFooter
    )
}
