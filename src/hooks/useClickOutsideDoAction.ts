import { useEffect } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */

interface UseClickOutsideAlerter {
    ref: any
    isActive: boolean // if is not active it doesnt trigger the action
    doAction: any // function to execute if click outside an element
}
export const useClickOutsideDoAction = ({
    ref,
    doAction,
    isActive,
}: UseClickOutsideAlerter) => {
    const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target) && isActive) {
            doAction()
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, isActive])
}
