import { useState, useEffect } from 'react'

import { DeviceName, DeviceBreakpoint } from '@ds.e/foundation'

const useDeviceSize = () => {
    const [device, setDevice] = useState<DeviceName>(DeviceName.phone)

    useEffect(() => {
        const { innerWidth } = window
        let actualDevice: DeviceName = DeviceName.phone

        if (innerWidth < DeviceBreakpoint.phone) actualDevice = DeviceName.phone
        if (
            innerWidth > DeviceBreakpoint.phone &&
            innerWidth < DeviceBreakpoint.tablet
        )
            actualDevice = DeviceName.tablet
        if (
            innerWidth > DeviceBreakpoint.tablet &&
            innerWidth < DeviceBreakpoint.laptop
        )
            actualDevice = DeviceName.laptop
        if (innerWidth > DeviceBreakpoint.laptop)
            actualDevice = DeviceName.desktop

        setDevice(prevDevice =>
            prevDevice !== actualDevice ? actualDevice : prevDevice,
        )
    }, [])

    return device
}

export default useDeviceSize
