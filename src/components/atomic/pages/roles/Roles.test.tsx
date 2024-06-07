import React from 'react'
import { render } from '@testing-library/react'

import Roles from './RolesPage'


test('renders all options passed to it', () => {
    render(<Roles />)
})