import React from 'react'
import { render } from '@testing-library/react'

import SplashScreen from './SplashScreen'

test('renders all options passed to it', () => {
    render(<SplashScreen />)
})