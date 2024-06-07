import React from 'react';
import { render } from '@testing-library/react';
import Usuarios from './UsuariosPage';


test('renders all options passed to it', () => {
    render(<Usuarios />)
})