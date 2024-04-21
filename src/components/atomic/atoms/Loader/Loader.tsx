import React, { CSSProperties } from 'react'
import Lottie from 'react-lottie'
import * as loaderAsset from '@assetsJSON/Dots_Loader.json'
import './Loader.scss'

interface LoaderProps {
    message?: string
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
    const MessageText = ({ style }: { style: CSSProperties }) => (
        <div
            className="message-text"
            style={style}>
            {message}
        </div>
    )

    return (
        <div
            className="loader-screen-section"
            data-testid="loader-screen-section">
            <MessageText
                style={{
                    opacity: 1,
                    visibility: 'visible',
                }}
            />
            <div
                className="loader-screen-animation"
                data-testid="loader-lottie-animation">
                <Lottie
                    options={{
                        loop: false,
                        autoplay: true,
                        animationData: loaderAsset,
                    }}
                />
            </div>
        </div>
    )
}

export default Loader
