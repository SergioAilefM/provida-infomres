import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import { useGetUsuarios } from './useGetUsuarios'


import dataUsuarios from '../../../../mockServer/data/usuariosData.json'

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
        data: dataUsuarios,
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
    () => useGetUsuarios(1),
    { wrapper },
  )

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toEqual(dataUsuarios)
})
