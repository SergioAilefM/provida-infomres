import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import { useGetSpecialtiesSample } from './useGetSpecialtiesSample'

import dataSpecialtiesSample from '../../../../mockServer/data/specialtiesSampleData.json'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

beforeAll(() => {
    jest.mock('axios', () => {
        const mAxiosInstance = {
            get: jest.fn().mockResolvedValue({
                data: dataSpecialtiesSample,
            }),
        }
        return {
            create: jest.fn(() => mAxiosInstance),
        }
    })
})

test('customHook returns correct data', async () => {
    const wrapper = ({ children }: any) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )

    const { result, waitFor } = renderHook(() => useGetSpecialtiesSample(), {
        wrapper,
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toEqual(dataSpecialtiesSample)
})
