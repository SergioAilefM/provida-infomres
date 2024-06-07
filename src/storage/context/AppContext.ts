import React from 'react'
import { AppContextProps } from '../interfaces/types'

const AppContext = React.createContext<AppContextProps>({} as AppContextProps)

export default AppContext
