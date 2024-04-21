import React, { ReactNode, useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import { PAGE_TITLE } from '@constants/pageTitle'
import FeaturedServiceCard from '@molecules/FeaturedServiceCard'
import DisclaimerModal from '@molecules/DisclaimerModal/DisclaimerModal'
import Loader from '@atoms/Loader'
import { DeviceName } from '@ds.e/foundation'
import { LOADER_LABELS } from '@constants/loaderLabels'
import { useAppContext } from '@hooks/useAppContext'
import { useAdobeAnalytics } from '@hooks/useAdobeAnalytics'
import useHomePageController from '@hooks/useHomePageControler'
import { useGetSpecialtiesSample } from '@services/specialtiesSample/getSpecialtiesSample/useGetSpecialtiesSample'
import HomeFloatingCircle from '@assetsSVG/HomeFloatingCircleDesktop.svg'
import '@templates/home/Home.scss'

const FloatingCircle = ({ device }: { device: DeviceName }) => (
    <div className="mo-homepage-floating-circle">
        {!!device && (
            <img
                alt="floating-circle"
                src={HomeFloatingCircle}
            />
        )}
    </div>
)

const HomeContainer = ({
    children,
    device,
}: {
    children: ReactNode
    device: DeviceName
}) => (
    <div className="mo-homepage-container">
        <FloatingCircle device={device} />
        {children}
    </div>
)

const HomePage = () => {
    const { registerViewData } = useAdobeAnalytics()
    const {
        appState: { viewportSize, showLoading },
        setShowLoading,
    } = useAppContext()
    const { specialtiesErrorHandler, handleNavigateVideoCall } =
        useHomePageController()

    const {
        error: errorSpecialties,
        isFetched: isFetchedSpecialties,
        data: dataSpecialties,
    } = useGetSpecialtiesSample()

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        specialtiesErrorHandler(errorSpecialties)
    }, [errorSpecialties])

    useEffect(() => {
        registerViewData('HOME', 'page')
        setShowLoading(true)
    }, [])

    useEffect(() => {
        if (isFetchedSpecialties) {
            setShowLoading(false)
        }
    }, [isFetchedSpecialties])

    return (
        <DocumentTitle title={PAGE_TITLE.HOME}>
            <HomeContainer device={viewportSize}>
                {showLoading ? (
                    <Loader message={LOADER_LABELS.MESSAGE_TEXT} />
                ) : (
                    <>
                        <DisclaimerModal
                            open={isModalOpen}
                            handleCloseModal={() => setIsModalOpen(false)}
                            handleNavigate={handleNavigateVideoCall}
                        />

                        {!!dataSpecialties && (
                            <FeaturedServiceCard
                                featuredServices={
                                    dataSpecialties.specialtiesSample
                                }
                                redirectCallback={() => setIsModalOpen(true)}
                            />
                        )}
                    </>
                )}
            </HomeContainer>
        </DocumentTitle>
    )
}

export default HomePage
