import React from 'react'
import { AdobeContextProps } from '../interfaces/adobeTypes'

const AdobeContext = React.createContext<AdobeContextProps>(
    {} as AdobeContextProps,
)

export default AdobeContext
