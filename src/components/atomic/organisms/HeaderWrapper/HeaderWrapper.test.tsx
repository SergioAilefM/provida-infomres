import React from 'react'
import { render } from '@testing-library/react'

import {HeaderWrapper} from './HeaderWrapper'

test('renders all options passed to it', () => {
    render(<HeaderWrapper />)
})