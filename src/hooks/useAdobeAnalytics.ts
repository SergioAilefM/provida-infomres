import { useAdobeContext } from '@hooks/useAdobeContext'
import {
    UserData,
    BusinessData,
    ViewData,
    EventData,
    ErrorData,
    ViewType,
    EventType,
} from '@storage/interfaces/adobeTypes'

declare global {
    interface Window {
        adobeDataLayer: any
        _satellite: { track: any }
    }
}

export const useAdobeAnalytics = () => {
    const {
        adobeState,
        removeEvent,
        removeError,
        setUser,
        setBusiness,
        setView,
        setError,
        setEvent,
        setRouteSnapshot,
    } = useAdobeContext()
    const { view, userData, business, error, event, routeSnapshot } = adobeState

    function recorder() {
        const dataLayerObj = {
            event: {
                COMPANY_NAME_APP_NAME: {
                    view,
                    business,
                    userData,
                    event: event || null,
                    error: error || null,
                },
            },
        }
        if (window.adobeDataLayer && view.date) {
            window.adobeDataLayer.push(dataLayerObj)
            window._satellite.track('EVENTO_ORIENTA')
            removeEvent()
            removeError()
        }
    }

    function registerUserData(_user: UserData): void {
        setUser(_user)
    }

    function registerBusinessData(_business: BusinessData): void {
        setBusiness(_business)
    }

    function registerViewData(_viewName: string, _viewType: ViewType): void {
        const dataview: ViewData = {
            date: new Date().getTime().toString(),
            viewName: _viewName,
            viewType: _viewType,
            currentPage: routeSnapshot.currentPage,
            previousPage: routeSnapshot.previousPage,
        }
        setView(dataview)
    }

    function registerEventData(
        _elementID: string,
        _eventType: EventType,
        _eventName: string,
        _eventDescription: string,
    ): void {
        const dataEvent: EventData = {
            date: new Date().getTime().toString(),
            elementID: _elementID,
            eventType: _eventType,
            eventName: _eventName,
            eventDescription: _eventDescription,
        }
        setEvent(dataEvent)
    }

    function registerErrorData(
        _title: string,
        _code: string,
        _data: string,
    ): void {
        const dataError: ErrorData = {
            title: _title,
            code: _code,
            data: _data,
        }
        setError(dataError)
    }

    function registerRouteSnapshot(
        _currentPage: string,
        _previousPage: string,
    ): void {
        setRouteSnapshot({
            currentPage: _currentPage,
            previousPage: _previousPage,
        })
    }

    return {
        recorder,
        registerUserData,
        registerBusinessData,
        registerViewData,
        registerEventData,
        registerErrorData,
        registerRouteSnapshot,
    }
}
