import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Label } from '@ds.e/react'
import DocumentTitle from 'react-document-title'
import DisclaimerModal from '@molecules/DisclaimerModal/DisclaimerModal'
import { Clock } from '@assetsICONS/Clock'
import { PATHS } from '@constants/paths'
import { PAGE_TITLE } from '@constants/pageTitle'
import { DeviceName } from '@ds.e/foundation'
import { useAppContext } from '@hooks/useAppContext'
import { useGetSpecialtyDataById } from '@services/useSpecialty'
import { useAdobeAnalytics } from '@hooks/useAdobeAnalytics'
import { useAdobeContext } from '@hooks/useAdobeContext'
import useBreadcrumb from '@hooks/useBreadcrumb'
import {
    breadcrumbTitles,
    getBreadcrumbTitleByURL,
} from '@utilities/breadcrumb-utils'
import { getIcon } from '@utilities//program-details'
import { Specialty } from '@services/models/Specialty'
import { PROGRAM_DETAILS_PAGE_LABELS } from '@constants/programDetailsPageLabels'

import '@ds.e/scss/lib/Breadcrumb.css'
import '@ds.e/scss/lib/Button.css'
import '@ds.e/scss/lib/ItemBreadcrumb.css'
import '@ds.e/scss/lib/Label.css'
import '../../templates/programDetails/ProgramDetails.scss'
import { useError } from '../../../../hooks/useError'

const CLASSNAME = 'program-details'

const BREADCRUMBS = [
    { title: breadcrumbTitles.home, pageToNavigate: PATHS.HOME },
    {
        title: breadcrumbTitles.especialidades,
        pageToNavigate: PATHS.SPECIALTIES,
    },
]

type DataResponse = {
    id: number
    title: string
    type?: Specialty
    order: number
    showOnHome: true
    businessHours: string
    description: string
    included: string[]
    notIncluded: string[]
    immediateConsultation: boolean
}

const ProgramDetailsPage = () => {
    const {
        appState: { viewportSize },
    } = useAppContext()
    const navigate = useNavigate()
    const { setRouteSnapshot } = useAdobeContext()
    const { registerViewData, registerEventData } = useAdobeAnalytics()
    const { specialtyId } = useParams()
    const {
        error: errorSpecialties,
        loading: loadingSpecialties,
        data: dataSpecialties,
        isFetching: isFetchingSpecialty,
    } = useGetSpecialtyDataById(Number(specialtyId ?? 1))
    const { errorHandler } = useError()

    const [specialtyType, setSpecialtyType] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (dataSpecialties) {
            registerViewData(dataSpecialties.title, 'page')
            setSpecialtyType(dataSpecialties?.type)
        }
    }, [dataSpecialties])

    useEffect(() => {
        let statusCode = ''
        if (errorSpecialties) {
            statusCode = errorSpecialties?.message
                .split('status code')[1]
                .replaceAll(' ', '')
        }
        if (statusCode !== '') {
            errorHandler(statusCode)
            navigate(PATHS.ERROR)
        }
    }, [errorSpecialties])

    const { breadcrumb } = useBreadcrumb(
        [
            ...BREADCRUMBS,
            specialtyType
                ? { title: getBreadcrumbTitleByURL(dataSpecialties?.type) }
                : { title: '' },
        ],
        viewportSize,
    )

    const handleNavigateVideoCall = () => {
        navigate(PATHS.VIDEOCALL, {
            state: {
                specialty: 'Medicina General',
                previousPage: `${PATHS.SPECIALTIES}/${specialtyId}`,
            },
        })
    }

    const registerButtonClicked = () => {
        registerEventData('TBD', 'click', 'TBD', 'TBD')
        setIsModalOpen(true)
    }

    const navigateToAppointmentScheduler = () => {
        registerEventData('TBD', 'click', 'TBD', 'TBD')
        navigate(PATHS.APPOINTMENT_SCHEDULER)
    }

    const isMobile =
        viewportSize === DeviceName.phone || viewportSize === DeviceName.tablet

    const buttonsSectionMobile = (
        <div className={`${CLASSNAME}-buttons-section`}>
            {dataSpecialties?.immediateConsultation ? (
                <div className={`${CLASSNAME}-first-button`}>
                    <Button
                        label={PROGRAM_DETAILS_PAGE_LABELS.STARTMEETING}
                        ariaLabel={PROGRAM_DETAILS_PAGE_LABELS.STARTMEETING}
                        css={{ width: '100%' }}
                        onClick={() => registerButtonClicked()}
                    />
                </div>
            ) : null}
            <Button
                label={PROGRAM_DETAILS_PAGE_LABELS.SCHEDULE}
                ariaLabel={PROGRAM_DETAILS_PAGE_LABELS.SCHEDULE}
                buttonType={
                    dataSpecialties?.immediateConsultation ? 'outline' : 'fill'
                }
                css={{ width: '100%' }}
                onClick={navigateToAppointmentScheduler}
            />
        </div>
    )

    const buttonStyleDesktop = {
        width: '11.625rem',
        height: '100%',
        padding: 0,
    }

    const buttonsSectionDesktop = (
        <div className={`${CLASSNAME}-buttons-section`}>
            <div className={`${CLASSNAME}-first-button`}>
                <Button
                    label={PROGRAM_DETAILS_PAGE_LABELS.SCHEDULE}
                    ariaLabel={PROGRAM_DETAILS_PAGE_LABELS.SCHEDULE}
                    buttonType={
                        dataSpecialties?.immediateConsultation
                            ? 'outline'
                            : 'fill'
                    }
                    css={buttonStyleDesktop}
                    onClick={navigateToAppointmentScheduler}
                />
            </div>
            {dataSpecialties?.immediateConsultation ? (
                <Button
                    label={PROGRAM_DETAILS_PAGE_LABELS.STARTMEETING}
                    className={`${CLASSNAME}-inmediate-consultation`}
                    onClick={registerButtonClicked}
                />
            ) : null}
        </div>
    )

    const buttonsSection = isMobile
        ? buttonsSectionMobile
        : buttonsSectionDesktop

    const firstSectionContainer = (
        <div className={`${CLASSNAME}-first-section-container`}>
            <div className={`${CLASSNAME}-first-section`}>
                <div className={`${CLASSNAME}-breadcrumb-container`}>
                    {breadcrumb}
                </div>
                <div className={`${CLASSNAME}-icon-container`}>
                    {dataSpecialties ? getIcon(dataSpecialties?.type) : ''}
                </div>
                <div className={`${CLASSNAME}-top-container`}>
                    <div>
                        <div className={`${CLASSNAME}-main-title-container`}>
                            <Label
                                as="h3"
                                className={`${CLASSNAME}-title-label`}>
                                {dataSpecialties?.title}
                            </Label>
                        </div>
                        <div className={`${CLASSNAME}-time-container`}>
                            <div className={`${CLASSNAME}-time-icon-container`}>
                                <Clock />
                            </div>
                            <Label
                                className={`${CLASSNAME}-label-business-main`}
                                as="p">
                                {dataSpecialties?.businessHours}
                            </Label>
                        </div>
                    </div>
                    <div>{!isMobile ? buttonsSectionDesktop : null}</div>
                </div>
            </div>
        </div>
    )

    const getDescriptionContainer = (
        data: DataResponse, // Specialty
    ) => (
        <div className={`${CLASSNAME}-description-second-section-container`}>
            <div className={`${CLASSNAME}-description-left-container`}>
                <div className={`${CLASSNAME}-description-title-container`}>
                    <Label className={`${CLASSNAME}-label-bold`}>
                        {PROGRAM_DETAILS_PAGE_LABELS.INCLUDETITLE}
                    </Label>
                </div>
                {data?.included.map(include => (
                    <div
                        className={`${CLASSNAME}-bullet-container`}
                        key={include}>
                        <Label className={`${CLASSNAME}-label bullet`}>
                            &nbsp;•&nbsp;
                        </Label>
                        <Label
                            className={`${CLASSNAME}-label bullet`}
                            key={include}>
                            {include}
                        </Label>
                    </div>
                ))}
            </div>
            <div className={`${CLASSNAME}-description-right-container`}>
                <div className={`${CLASSNAME}-description-title-container`}>
                    <Label className={`${CLASSNAME}-label-bold`}>
                        {PROGRAM_DETAILS_PAGE_LABELS.NOINCLUDETITLE}
                    </Label>
                </div>
                {data?.notIncluded.map(notInclude => (
                    <div
                        className={`${CLASSNAME}-bullet-container`}
                        key={notInclude}>
                        <Label className={`${CLASSNAME}-label bullet`}>
                            &nbsp;•&nbsp;
                        </Label>
                        <Label
                            className={`${CLASSNAME}-label bullet`}
                            key={notInclude}>
                            {notInclude}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <DocumentTitle
            title={`${PAGE_TITLE.SPECIALTIES}-${dataSpecialties?.title}`}>
            <div>
                <DisclaimerModal
                    open={isModalOpen}
                    handleCloseModal={() => setIsModalOpen(false)}
                    handleNavigate={handleNavigateVideoCall}
                />
                <div className={`${CLASSNAME}`}>
                    {/* TODO ADD LOADING SKELETON OR LOADER */}
                    {loadingSpecialties ? 'Cargando...' : firstSectionContainer}
                    <div className={`${CLASSNAME}-info-section`}>
                        {isMobile ? buttonsSectionMobile : null}
                        <div
                            className={`${CLASSNAME}-description-first-section-container`}>
                            <Label
                                className={`${CLASSNAME}-label`}
                                as="p">
                                {dataSpecialties?.description}
                            </Label>
                        </div>
                        {dataSpecialties &&
                            getDescriptionContainer(dataSpecialties)}
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}

export default ProgramDetailsPage
