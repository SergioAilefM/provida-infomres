import { QueryClientProvider, QueryClient } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import { useGetPerfiles } from './useGetPerfiles'


import dataPerfiles from '../../../../mockServer/data/perfilesData.json'

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
        data: dataPerfiles,
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
    () => useGetPerfiles(1),
    { wrapper },
  )

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toEqual(dataPerfiles)
})
