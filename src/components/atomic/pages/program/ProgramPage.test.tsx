import React from 'react'
import { render } from '@testing-library/react'
import axios from 'axios'
import { DeviceName } from '@ds.e/foundation'
import { QueryClient, QueryClientProvider } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import { useGetSpecialtiesSample } from '@services/specialtiesSample/getSpecialtiesSample/useGetSpecialtiesSample'
import { useAppContext } from '@hooks/useAppContext'

import ProgramPage from './ProgramPage'

jest.mock('axios', () => ({
    get: jest.fn(() =>
        Promise.resolve({
            data: [
                {
                    id: 1,
                    title: 'Medicina general',
                    type: 'GENERAL_MEDICINE',
                    order: 0,
                    showOnHome: true,
                    businessHours: 'Atención 24 horas',
                },
            ],
        }),
    ),
}))

const mockAppContext = useAppContext as jest.MockedFunction<any>

const queryClient = new QueryClient()

const wrapper = () => (
    <QueryClientProvider client={queryClient}>
        <ProgramPage />
    </QueryClientProvider>
)

test('renders all options passed to it', () => {
    mockAppContext.mockReturnValue({
        appState: { viewportSize: DeviceName.phone },
    })
    render(wrapper())
})

test('useSpecialties', async () => {
    axios.get = jest.fn()

    mockAppContext.mockReturnValue({
        appState: { viewportSize: DeviceName.phone },
    })

    const { result, waitFor } = renderHook(() => useGetSpecialtiesSample(), {
        wrapper,
    })
})
