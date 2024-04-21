import React, { CSSProperties, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { Header, HeaderMenu, BrandIcon } from '@ds.e/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetSpecialtiesSample } from '@services/specialtiesSample/getSpecialtiesSample/useGetSpecialtiesSample'
import FeaturedService from '@assetsSVG/EspecialidadFeatured.svg'
import BrandLogo from 'assets/icons/BrandLogo'
import { useAppContext } from '@hooks/useAppContext'
import { useDisplayHeader } from '@hooks/useDisplayHeader'
import { useInitSiteMinderSession } from '@services/useInitSiteMinderSession'
import { SpecialtiesSample } from '@services/specialtiesSample/SpecialtiesSampleModel'
import { PATHS } from '@constants/paths'
import { CategoriesMockData } from './data/MOMenuCategories'
import TabsWrapper from './components/TabsWrapper/TabsWrapper'
import { Category } from './data/Menu.types'

import '@ds.e/scss/lib/Box.css'
import '@ds.e/scss/lib/Header.css'
import '@ds.e/scss/lib/HeaderMenu.css'
import '@ds.e/scss/lib/BrandIcon.css'

const DeviceMarginTopMapping: {
    phone: number
    tablet: number
    laptop: number
    desktop: number
} = {
    phone: 40,
    tablet: 0,
    laptop: 70,
    desktop: 70,
}

export type HeaderWrapperTypes = {
    showMenu: boolean
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderWrapper = ({ showMenu, setMenuOpen }: HeaderWrapperTypes) => {
    const location = useLocation()

    const navigate = useNavigate()

    const { logOut } = useInitSiteMinderSession()

    const {
        appState,
        appState: { viewportSize },
    } = useAppContext()

    const {
        error: errorSpecialties,
        isLoading: loadingSpecialties,
        data: dataSpecialties,
    } = useGetSpecialtiesSample()

    const [selectedTabIdx, setSelectedTabIdx] = useState(0)
    const [open, setOpen] = useState(false)

    const {
        session: { userId, clientNumber },
    } = appState

    const isMobileView = viewportSize === ('phone' || 'tablet')

    const handleHamburgerClick = () => {
        if (showMenu) {
            setMenuOpen(true)
            // const newPreviousPage = location.pathname.replace(/[^\w\s]/gi, '/');
        }
    }

    // const handleRedirectOnClick = () => navigate('/home')
    const handleRedirectOnClick = () => navigate(PATHS.HOME)
    // window.location.replace(window.location.origin)

    const handleTabClicked = (tabIdx: number) => {
        setSelectedTabIdx(tabIdx)
        setOpen(true)
    }

    const openMenu = () => setOpen(true)

    const closeMenu = () => setOpen(false)

    const handleOpen = () => (open ? closeMenu() : openMenu())

    const Logo = (
        <BrandIcon
            logo={<BrandLogo />}
            handleRedirectOnClick={handleRedirectOnClick}
            ariaLabel="Icon"
        />
    )

    const Tabs = (
        <TabsWrapper
            selectedTabIdx={selectedTabIdx}
            handleTabClicked={handleTabClicked}
            categories={CategoriesMockData}
        />
    )

    const headerMenuStyle: CSSProperties = {
        position: 'fixed',
        top: DeviceMarginTopMapping[appState.viewportSize],
        left: 0,
        zIndex: 10000,
    }
    console.log(dataSpecialties)

    const formattedDataSpecialties = dataSpecialties
        ? dataSpecialties.specialtiesSample.map(
              (specialty: SpecialtiesSample): Category => ({
                  name: specialty.title,
                  nameAriaLabel: specialty.title,
                  url: `${PATHS.SPECIALTIES}/${specialty.id}`,
                  urlAriaLabel: specialty.title,
              }),
          )
        : [{ name: loadingSpecialties ? 'Cargando...' : '' }]

    const categories = CategoriesMockData.map(categorie => ({
        ...categorie,
        subCategories:
            categorie.name === 'Especialidades'
                ? formattedDataSpecialties
                : categorie.subCategories,
    }))

    const featuredImg = (
        <img
            src={FeaturedService}
            alt="Imagen Destacada"
            style={{
                width: 'auto',
                height: '100%',
            }}
        />
    )

    return useDisplayHeader() ? (
        <>
            <Header
                device={appState.viewportSize}
                leftSection={{
                    sizes: {
                        phone: !open ? (
                            <GiHamburgerMenu onClick={handleOpen} />
                        ) : (
                            Logo
                        ),
                        tablet: <GiHamburgerMenu onClick={handleOpen} />,
                        laptop: Logo,
                        desktop: Logo,
                    },
                }}
                middleSection={{
                    sizes: {
                        phone: !open ? Logo : <></>,
                        tablet: Logo,
                        laptop: <></>,
                        desktop: <></>,
                    },
                }}
                rightSection={{
                    sizes: {
                        phone: open ? (
                            <IoMdClose onClick={handleOpen} />
                        ) : (
                            <></>
                        ),
                        tablet: <></>,
                        laptop: Tabs,
                        desktop: Tabs,
                    },
                }}
                className={!isMobileView ? 'header--profile-menu' : ''}
            />
            {open && (
                <div
                    className="HeaderMenuRelative menu-open"
                    style={{
                        position: 'relative',
                    }}>
                    <div
                        className="HeaderMenuAbsolute"
                        style={headerMenuStyle}
                        onMouseLeave={closeMenu}>
                        <HeaderMenu
                            screenSize={viewportSize}
                            categories={categories}
                            selectedCategory={categories[selectedTabIdx]}
                            featuredImageHolder={featuredImg}
                            navigate={navigate}
                        />
                    </div>
                </div>
            )}
        </>
    ) : null
}

export default HeaderWrapper
