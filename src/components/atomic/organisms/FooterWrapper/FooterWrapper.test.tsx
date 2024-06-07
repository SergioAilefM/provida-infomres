import React from 'react'
import { render } from '@testing-library/react'

import FooterWrapper from './FooterWrapper'

test('renders all options passed to it', () => {
    render(<FooterWrapper />)
})