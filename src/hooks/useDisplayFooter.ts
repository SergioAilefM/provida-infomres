import { useLocation } from 'react-router-dom'
import { ROUTES_WITHOUT_FOOTER } from '@constants/footer'

export const useShouldDisplayFooter = () => {
    const location = useLocation()
    return ROUTES_WITHOUT_FOOTER.every(el => !location.pathname.includes(el))
}

export const useDisplayFooter = () => {
    const location = useLocation()

    const toShowFooter = () => {
        if (location.pathname === '/') return null
        return true
    }

    return (
        ROUTES_WITHOUT_FOOTER.every(el => !location.pathname.includes(el)) &&
        toShowFooter
    )
}
