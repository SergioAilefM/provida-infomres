import React from 'react'
import DocumentTitle from 'react-document-title'
import { useAppContext } from '@hooks/useAppContext'
import { Label, InfoCard } from '@ds.e/react'
import useBreadcrumb from '@hooks/useBreadcrumb'
import '@ds.e/scss/lib/InfoCard.css'
import '@ds.e/scss/lib/Label.css'
import '@ds.e/scss/lib/Breadcrumb.css'
import '@ds.e/scss/lib/ItemBreadcrumb.css'
import '@molecules/FeaturedServiceCard/FeaturedServiceCard.scss'
import '../../templates/program/Program.scss'
import { ClockGray } from '@assetsICONS/ClockGray'

import { Correct } from '@assetsICONS/Correct'
import { PATHS } from '@constants/paths'
import { PAGE_TITLE } from '@constants/pageTitle'
import { getIcon } from '@utilities/program-details'
import { SpecialtiesSample } from '@services/specialtiesSample/SpecialtiesSampleModel'
import { useNavigate } from 'react-router-dom'
import { DeviceName } from '@ds.e/foundation'
import { breadcrumbTitles } from '@utilities/breadcrumb-utils'
import { useGetSpecialtiesSample } from '@services/specialtiesSample/getSpecialtiesSample/useGetSpecialtiesSample'

import Background from '../../../../assets/images/background.png'
import BackgroundMobile from '../../../../assets/images/background-mobile.png'

const CLASSNAME = 'program'

const BENEFITS = [
    '100% gratuitas y sin limites de uso.',
    'Múltiples canales de atención: Teléfono, videoconsulta, chat.',
    'Agenda tu cita con el especialista que necesites.',
]

const BREADCRUMBS = [
    { title: breadcrumbTitles.home, pageToNavigate: PATHS.HOME },
    {
        title: breadcrumbTitles.especialidades,
        pageToNavigate: PATHS.SPECIALTIES,
    },
]

const TITLES = {
    main: 'Especialidades para tí',
}

const ProgramPage = () => {
    const {
        appState,
        appState: { viewportSize },
    } = useAppContext()

    const {
        error: errorSpecialties,
        isLoading: loadingSpecialties,
        data: dataSpecialties,
    } = useGetSpecialtiesSample()

    const navigate = useNavigate()

    const { breadcrumb } = useBreadcrumb([...BREADCRUMBS], viewportSize)

    const handleCardClick = (path: string) => navigate(path)

    const specialtyCard = (specialty: SpecialtiesSample, index: number) => (
        <div
            onClick={() => handleCardClick(`${specialty.id}`)}
            role="button"
            key={specialty.id}
            onKeyDown={() => handleCardClick(`${specialty.id}`)}
            tabIndex={index}>
            <InfoCard.Card className={`${CLASSNAME}-card-container`}>
                <InfoCard.Container
                    containerStyle={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <div className={`${CLASSNAME}-icon-container`}>
                        {getIcon(specialty.type)}
                    </div>
                </InfoCard.Container>
                <div className={`${CLASSNAME}-card-bottom-container`}>
                    <div style={{ paddingBottom: '0.5rem' }}>
                        <Label
                            as="p"
                            className={`${CLASSNAME}-label-time`}>
                            {specialty.title}
                        </Label>
                    </div>
                    <div className={`${CLASSNAME}-time-container`}>
                        <div className={`${CLASSNAME}-clock-container`}>
                            <ClockGray />
                        </div>
                        <Label
                            as="p"
                            className={`${CLASSNAME}-business-hours`}>
                            {specialty.businessHours}
                        </Label>
                    </div>
                </div>
            </InfoCard.Card>
        </div>
    )

    const benefitsContainer = BENEFITS.map(benefit => (
        <div
            className={`${CLASSNAME}-benefits-title`}
            key={benefit}>
            <div>
                <Correct />
            </div>
            &nbsp;&nbsp;
            <Label
                as="p"
                className={`${CLASSNAME}-label-benefits`}>
                {benefit}
            </Label>
        </div>
    ))

    const isMobile = viewportSize === DeviceName.phone

    const background = {
        backgroundImage: `url(${isMobile ? BackgroundMobile : Background})`,
    }

    return (
        <DocumentTitle title={PAGE_TITLE.SPECIALTIES}>
            <>
                <div>
                    <div
                        className={`${CLASSNAME}-first-section-container`}
                        style={background}>
                        <div className={`${CLASSNAME}-first-section`}>
                            <div
                                className={`${CLASSNAME}-breadcrumb-container`}>
                                {breadcrumb}
                            </div>
                            <Label
                                as="h3"
                                className={`${CLASSNAME}-label-title`}>
                                {TITLES.main}
                            </Label>
                            <div className={`${CLASSNAME}-benefits-container`}>
                                {benefitsContainer}
                            </div>
                        </div>
                    </div>
                    <div className={`${CLASSNAME}-second-section-container`}>
                        <div className={`${CLASSNAME}-second-section-grid`}>
                            {loadingSpecialties ||
                            !dataSpecialties.specialtiesSample ? (
                                <div>Loading..</div>
                            ) : (
                                dataSpecialties.specialtiesSample?.map(
                                    (
                                        specialty: SpecialtiesSample,
                                        index: number,
                                    ) => specialtyCard(specialty, index),
                                )
                            )}
                        </div>
                    </div>
                </div>
            </>
        </DocumentTitle>
    )
}

export default ProgramPage
