import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Loader from './Loader'

describe('Loader Component', () => {
    test('renders loader screen with Lottie animation', () => {
        render(<Loader message="dummy message" />)

        // Check if the loader-screen-section is present
        const splashScreenSection = screen.getByTestId('loader-screen-section')
        expect(splashScreenSection).toBeInTheDocument()

        // Check if the Lottie animation is present
        const lottieAnimation = screen.getByTestId('loader-lottie-animation')
        expect(lottieAnimation).toBeInTheDocument()
    })
})
