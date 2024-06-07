import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import { useGetFuncionalidad } from './useGetFuncionalidad'


import dataFuncionalidad from '../../../../mockServer/data/funcionalidadData.json'

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
        data: dataFuncionalidad,
      }),
    }
    return {
      create: jest.fn(() => mAxiosInstance),
    }
  })
})

test('customHook returns correct data', async () => {
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  const { result, waitFor } = renderHook(
    () => useGetFuncionalidad(1),
    { wrapper },
  )

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toEqual(dataFuncionalidad)
})
