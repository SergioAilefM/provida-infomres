import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Contact from './Contact'

describe('Atom - Contact Component', () => {
    test('Render Contact Icon', () => {
        render(
            <Contact
                type="whatsapp"
                value="+569 9968 7935"
                href="https://wa.me/+56999687935"
            />,
        )

        // Check if contact element is present
        const contactElement = screen.getByTestId('mo-web-contact')
        expect(contactElement).toBeInTheDocument()

        // Check if contact icon is present
        const contactIcon = screen.getByTestId('mo-web-contact-icon')
        expect(contactIcon).toBeInTheDocument()

        // Check if contact number is present
        const contactNumber = screen.getByTestId('mo-web-contact-value')
        expect(contactNumber).toBeInTheDocument()
    })
})
