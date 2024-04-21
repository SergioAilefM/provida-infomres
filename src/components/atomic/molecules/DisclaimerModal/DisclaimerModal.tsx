import React from 'react'
import { Modal, Button, Label } from '@ds.e/react'
import '@ds.e/scss/lib/Button.css'
import '@ds.e/scss/lib/Label.css'
import '@ds.e/scss/lib/Modal.css'

import SpeakerImage from '@assetsSVG/Speaker.svg'
import './DisclaimerModal.scss'
import { DataDisclaimerModal } from './DisclaimerModal.data'

type PropsDisclaimerModal = {
    open: boolean
    handleCloseModal: (isOpen: boolean) => void
    handleNavigate: () => void
}

const DisclaimerModal = ({
    open,
    handleCloseModal,
    handleNavigate,
}: PropsDisclaimerModal) => {
    const data = DataDisclaimerModal

    const RenderModalContent = () => {
        return (
            <div
                data-testid="modal-disclaimer"
                className="modal-disclaimer">
                <div
                    data-testid="modal-disclaimer-content"
                    className="modal-disclaimer-content">
                    <img
                        src={SpeakerImage}
                        data-testid="mo-speaker-img"
                        className="mo-speaker-img"
                        alt="mo-speaker-img"
                    />
                    <Label
                        as="h1"
                        data-testid="mo-modal-title"
                        className="mo-modal-title">
                        {data.title}
                    </Label>
                    <div className="mo-modal-container-description">
                        <Label
                            as="p"
                            className="mo-modal-description">
                            {data.description.text1}{' '}
                            <Label
                                as="strong"
                                className="mo-modal-description-bold">
                                {data.description.text2bold}
                            </Label>
                        </Label>
                        <br />
                        <Label
                            as="p"
                            className="mo-modal-description">
                            {data.description.text3}
                        </Label>
                    </div>
                    <div
                        data-testid="modal-container-buttons"
                        className="modal-container-buttons">
                        <Button
                            buttonType="outline"
                            label={data.btnLeft}
                            data-testid="modal-cancel-button"
                            id="modal-cancel-button"
                            className="modal-cancel-button modal-btn"
                            onClick={() => handleCloseModal(false)}
                        />
                        <Button
                            buttonType="fill"
                            data-testid="modal-navigate-button"
                            className="modal-btn"
                            label={data.btnRight}
                            onClick={handleNavigate}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Modal
            isModalOpen={open}
            className="dse-modal"
            modalContent={<RenderModalContent />}
        />
    )
}

export default DisclaimerModal
