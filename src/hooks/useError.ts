import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@hooks/useAppContext'
import { ErrorType } from '@storage/interfaces/types'
import { useAdobeAnalytics } from '@hooks/useAdobeAnalytics'

export const useError = () => {
    const { appState, setStopLoadingOnError, setError, removeError } =
        useAppContext()
    const { session } = appState
    const navigate = useNavigate()
    const { registerErrorData } = useAdobeAnalytics()

    const evaluateError = (errorCode: number, isLoggedIn: boolean | null) => {
        let errorData:
            | {
                  errorCode?: number
                  navigateUrl?: string
                  errorDesc?: string
                  errorType: ErrorType
              }
            | undefined = {
            errorCode: 560,
            errorType: 'mo-service-error',
        }

        if (!isLoggedIn) {
            errorData = {
                errorCode,
                navigateUrl: '/error',
                errorType: 'auth-failure',
            }
        }

        if (errorCode >= 400 && errorCode < 500) {
            errorData = {
                errorCode,
                navigateUrl: '/error',
                errorType: 'not-found-404',
            }
        } else if (errorCode >= 500) {
            errorData = {
                errorCode,
                navigateUrl: '/error',
                errorType: 'mo-service-error',
            }
        } else {
            errorData = {
                errorCode,
                navigateUrl: '/error',
                errorDesc: 'TBD',
                errorType: 'mo-service-error',
            }
        }
        return errorData
    }

    function errorHandler(_error: any, _customHandler?: () => void) {
        const { isLoggedIn } = session
        const errorData = evaluateError(_error?.statusCode, isLoggedIn)

        if (errorData) {
            setStopLoadingOnError(true)
            registerErrorData(
                'errorData.errorType',
                _error?.statusCode,
                _error?.description,
            )

            setError({
                showError: true,
                errorType: errorData.errorType,
                errorDescription: errorData.errorDesc
                    ? `${errorData.errorDesc}`
                    : `${_error?.description}`,

                onButtonClick: () => {
                    if (_customHandler) _customHandler()
                    if (errorData.navigateUrl) navigate(errorData.navigateUrl)
                    removeError()
                },
            })
        }
    }

    return {
        errorHandler,
    }
}
