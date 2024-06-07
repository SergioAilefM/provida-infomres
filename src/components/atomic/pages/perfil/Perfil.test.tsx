import React from 'react'
import { render } from '@testing-library/react'

import Perfil from './PerfilPage'


test('renders all options passed to it', () => {
    render(<Perfil />)
})