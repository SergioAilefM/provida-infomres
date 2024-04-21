import { useState } from 'react'
// Custom hook to manage the loading state
const useLoadingState = () => {
    const [showLoader, setShowLoader] = useState(true)

    const hideLoader = () => {
        setShowLoader(false)
    }

    return { showLoader, hideLoader }
}

export default useLoadingState
