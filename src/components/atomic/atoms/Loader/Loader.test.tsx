import React from 'react'
import { render } from '@testing-library/react'

import Loader from './Loader'

test('renders all options passed to it', () => {
    render(<Loader />)
})