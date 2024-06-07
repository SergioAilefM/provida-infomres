import React from 'react';
import './ButtonSeguridad.scss';
import { useIsAuthenticated } from '@azure/msal-react';
import ButtonSingOut from './ButtonSingOut';
import ButtonSingIn from './ButtonSingIn';

export function ButtonSeguridad() {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return < ButtonSingOut />;
    }
    return <ButtonSingIn />;

}

