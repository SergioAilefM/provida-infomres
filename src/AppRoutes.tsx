import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PATHS } from '@constants/paths';

const HomePage = lazy(() => import('@pages/home/HomePage'));
const RolesPage = lazy(() => import('@pages/roles/RolesPage'));
const UsuariosPage = lazy(() => import('@pages/usuarios/UsuariosPage'));
const PerfilPage = lazy(() => import('@pages/perfil/PerfilPage'));

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="*"
                element={
                    <HomePage />
                }
            />
            <Route
                path={PATHS.HOME}
                element={
                    <HomePage />
                }
            />
            <Route
                path={PATHS.ROLES}
                element={
                    <RolesPage />
                }
            />
            <Route
                path={PATHS.PERFIL}
                element={
                    <PerfilPage />
                }
            />
            <Route
                path={PATHS.USUARIOS}
                element={
                    <UsuariosPage />
                }
            />
        </Routes>
    )
}

export default AppRoutes;
