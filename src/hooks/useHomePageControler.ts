import { useError } from '@hooks/useError'
import { PATHS } from '@constants/paths'
import { useNavigate } from 'react-router-dom'

const useHomePageController = () => {
    const { errorHandler } = useError()
    const navigate = useNavigate()

    const handleNavigateVideoCall = () => {
        navigate(PATHS.VIDEOCALL, {
            state: {
                specialty: 'Medicina General',
                previousPage: PATHS.HOME,
            },
        })
    }

    const specialtiesErrorHandler = (
        _errorSpecialties: any,
        _customHandler?: () => void,
    ) => {
        errorHandler(_errorSpecialties, _customHandler)
    }

    return {
        specialtiesErrorHandler,
        handleNavigateVideoCall,
    }
}

export default useHomePageController
