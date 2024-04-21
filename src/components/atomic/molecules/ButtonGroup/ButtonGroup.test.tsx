import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { JSONErrorData } from '@pages/error/Error.data'
import ButtonGroup from './ButtonGroup'

const error = JSONErrorData['auth-failure']

describe('Molecule - ButtonGroup Component', () => {
    test('Render ButtonGroup', () => {
        const { buttonsData } = error
        render(<ButtonGroup buttonsData={buttonsData} />)

        // Check if contact element is present
        const buttonGroupElement = screen.getByTestId('mo-web-button-group')
        expect(buttonGroupElement).toBeInTheDocument()
    })
})
