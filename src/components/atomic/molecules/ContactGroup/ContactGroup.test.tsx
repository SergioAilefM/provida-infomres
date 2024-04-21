import React from 'react'
import { JSONErrorData } from '@pages/error/Error.data'
import { render, screen } from '@testing-library/react'
import ContactGroup from './ContactGroup'
import '@testing-library/jest-dom/extend-expect'

const error = JSONErrorData['auth-failure']

describe('Molecule - ContactGroup Component', () => {
    test('Render ContactGroup', () => {
        render(<ContactGroup contactData={error.contacts} />)

        // Check if contact element is present
        const contactGroupElement = screen.getByTestId('mo-web-contact-group')
        expect(contactGroupElement).toBeInTheDocument()
    })
})
