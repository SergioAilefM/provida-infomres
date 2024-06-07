import React from 'react'
import { render } from '@testing-library/react'

import Home from './HomePage'


test('renders all options passed to it', () => {
    render(<Home />)
})