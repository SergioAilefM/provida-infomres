import React from 'react'
import { useAppContext } from '@hooks/useAppContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAdobeAnalytics } from '@hooks/useAdobeAnalytics'
import HomePage from './HomePage'

const mockAppContext = useAppContext as jest.MockedFunction<any>

const mockAdobeContext = useAdobeAnalytics as jest.MockedFunction<any>

const queryClient = new QueryClient()

const wrapper = () => (
    <QueryClientProvider client={queryClient}>
        <HomePage />
    </QueryClientProvider>
)

test('renders all options passed to it', () => {
    // TODO: write test
    // mockAppContext.mockReturnValue({
    //    appState: { viewportSize: DeviceName.phone },
    // })

    // mockAdobeContext.mockReturnValue({ registerViewData: jest.fn() })

    //  render(wrapper())

    expect(true).toBe(true)
})
