import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useAppContext } from '@hooks/useAppContext'
import { AppContextProvider } from '@storage/context/AppContextProvider'
import SplashScreen from './SplashScreen'

// A utility function to wrap the SplashScreen component with the required context provider
const renderWithProvider = (children: React.ReactNode) => {
    return render(<AppContextProvider>{children}</AppContextProvider>)
}

const mockAppContext = useAppContext as jest.MockedFunction<any>

describe('SplashScreen Component', () => {
    test('renders splash screen with Lottie animation', () => {
        mockAppContext.mockReturnValue({
            appState: { loading: false },
        })

        renderWithProvider(
            <AppContextProvider>
                <SplashScreen />
            </AppContextProvider>,
        )

        // Check if the splash-screen-section is present
        const splashScreenSection = screen.getByTestId('splash-screen-section')
        expect(splashScreenSection).toBeInTheDocument()

        // Check if the Lottie animation is present
        const lottieAnimation = screen.getByTestId('lottie-animation')
        expect(lottieAnimation).toBeInTheDocument()
    })
})
