import React from 'react'
import { useAppContext } from '@hooks/useAppContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAdobeAnalytics } from '@hooks/useAdobeAnalytics'
import ProgramDetails from './ProgramDetailsPage'

const mockAppContext = useAppContext as jest.MockedFunction<any>

const mockAdobeContext = useAdobeAnalytics as jest.MockedFunction<any>

const queryClient = new QueryClient()

const wrapper = () => (
    <QueryClientProvider client={queryClient}>
        <ProgramDetails />
    </QueryClientProvider>
)

test('renders all options passed to it', () => {
    // TODO: write test
    expect(true).toBe(true)
})
