import React, { useCallback } from 'react'
import { MenuOption, MenuOptions } from '@ds.e/react'
import '@ds.e/scss/lib/Button.css'
import '@ds.e/scss/lib/MenuOption.css'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { Category } from '@organisms/HeaderWrapper/data/Menu.types'
import { useNavigate } from 'react-router-dom'

interface TabsWrapperProps {
    selectedTabIdx: number
    handleTabClicked: (tabIdx: number) => void
    categories: Category[]
}

const TabsWrapper = ({
    selectedTabIdx,
    handleTabClicked,
    categories,
}: TabsWrapperProps) => {
    const navigate = useNavigate()

    const handleNavigate = useCallback(
        url => {
            navigate(url)
        },
        [navigate],
    )

    return (
        <MenuOptions
            selectedOptionIdx={selectedTabIdx}
            handleOptionClicked={handleTabClicked}>
            {categories.map((category: Category) =>
                category.subCategories ? (
                    <MenuOption
                        key={`tab-${category.name}`}
                        label={category.name.toUpperCase()}
                        icon={!!category.subCategories && <BiChevronDown />}
                        iconSelected={
                            !!category.subCategories && <BiChevronUp />
                        }
                        showIcon
                    />
                ) : (
                    <button
                        type="button"
                        key={`tab-${category.name}`}
                        onClick={() => handleNavigate(category.url)}
                        style={{
                            textDecoration: 'none',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            alignSelf: 'center',
                            color: '#333333',
                            fontFamily: 'Metlife_Circular_Normal',
                            letterSpacing: '0.125rem',
                            fontSize: '0.75rem',
                            lineHeight: '0.813rem',
                        }}>
                        {category.name.toUpperCase()}
                    </button>
                ),
            )}
        </MenuOptions>
    )
}

export default TabsWrapper
