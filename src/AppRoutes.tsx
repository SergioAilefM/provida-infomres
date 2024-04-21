import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '@atoms/Loader'
import { PATHS } from '@constants/paths'
import { RequireAuth } from '@hoc/RequireAuth'

const ProgramPage = lazy(() => import('@pages/program/ProgramPage'))

// LOAD PAGE ASYNCHRONOUSLY
const HomePage = lazy(() => import('@pages/home/HomePage'))
const ErrorPage = lazy(() => import('@pages/error/ErrorPage'))
const ProgramDetailsPage = lazy(
    () => import('@pages/programDetails/ProgramDetailsPage'),
)

const renderLoader = () => <Loader message="Nos estamos preparando para ti" />

const AppRoutes = () => (
    <Suspense fallback={renderLoader()}>
        <Routes>
            <Route
                path="*"
                element={
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                }
            />
            <Route
                path={PATHS.ROOT}
                element={
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                }
            />
            <Route
                path={PATHS.HOME}
                element={
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                }
            />
            <Route
                path={PATHS.ERROR}
                element={<ErrorPage />}
            />
            <Route
                path={`${PATHS.SPECIALTY_DETAIL}/:programId`}
                element={
                    <RequireAuth>
                        <ProgramDetailsPage />
                    </RequireAuth>
                }
            />
            <Route
                path={PATHS.SPECIALTIES}
                element={
                    <RequireAuth>
                        <ProgramPage />
                    </RequireAuth>
                }
            />
            <Route
                path={`${PATHS.SPECIALTY_DETAIL}`}
                element={
                    <RequireAuth>
                        <ProgramDetailsPage />
                    </RequireAuth>
                }
            />
            {/* ADD PAGE ROUTE */}
        </Routes>
    </Suspense>
)

export default AppRoutes
