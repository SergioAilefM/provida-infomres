import React from 'react'
import { render, screen } from '@testing-library/react'
import DisclaimerModal from '@molecules/DisclaimerModal/DisclaimerModal'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}))
describe('Molecule - Disclaimer Modal', () => {
    test('Render Disclaimer Modal', () => {
        render(
            <DisclaimerModal
                open
                handleCloseModal={() => {}}
                handleNavigate={() => {}}
            />,
        )

        const textDisclaimer = screen.getByText(
            'El servicio de telemedicina de MetLife Orienta',
        )
        expect(textDisclaimer).toBeInTheDocument()
    })
})
