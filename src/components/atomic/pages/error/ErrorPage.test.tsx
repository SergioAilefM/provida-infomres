import React from 'react'
import { AppContextProvider } from '@storage/context/AppContextProvider'
import { render } from '@testing-library/react'
import { useAppContext } from '@hooks/useAppContext'
import '@testing-library/jest-dom/extend-expect'

const mockAppContext = useAppContext as jest.MockedFunction<any>

// A utility function to wrap the SplashScreen component with the required context provider
const renderWithProvider = (children: React.ReactNode) => {
    return render(<AppContextProvider>{children}</AppContextProvider>)
}

describe('Page - ErrorPage', () => {
    test('Render ContactGroup', () => {
        // TODO: write test
        // mockAppContext.mockReturnValue({
        //     appState: { viewportSize: DeviceName.phone, error: {} },
        // })

        // renderWithProvider(
        //     <AppContextProvider>
        //         <ErrorPage />
        //     </AppContextProvider>,
        // )

        // Check if error page elements are present
        // const errorPageContainer = screen.queryByTestId(
        //     'mo-web-error-page-container',
        // )
        // const errorPageSubContainer = screen.queryByTestId(
        //     'mo-web-error-page-subcontainer',
        // )
        // const errorPageLeftSection = screen.queryByTestId(
        //     'mo-web-error-page-left-section',
        // )
        // const errorPageLeftSectionTitle = screen.queryByTestId(
        //     'mo-web-error-page-left-section-title',
        // )
        // const errorPageLeftSectionContent = screen.queryByTestId(
        //     'mo-web-error-page-left-section-content',
        // )
        // const errorPageRightSection = screen.queryByTestId(
        //     'mo-web-error-page-right-section',
        // )
        // const errorPageRightSectionImage = screen.queryByTestId(
        //     'mo-web-error-page-right-section-image',
        // )
        // waitFor(() => expect(errorPageContainer).toBeInTheDocument())
        // waitFor(() => expect(errorPageSubContainer).toBeInTheDocument())
        // waitFor(() => expect(errorPageLeftSection).toBeInTheDocument())
        // waitFor(() => expect(errorPageLeftSectionTitle).toBeInTheDocument())
        // waitFor(() => expect(errorPageLeftSectionContent).toBeInTheDocument())
        // waitFor(() => expect(errorPageRightSection).toBeInTheDocument())
        // waitFor(() => expect(errorPageRightSectionImage).toBeInTheDocument())
        expect(true).toBe(true)
    })
})
