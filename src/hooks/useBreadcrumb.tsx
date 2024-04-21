import React from 'react'
import { Breadcrumb, ItemBreadcrumb } from '@ds.e/react'
import { DeviceName } from '@ds.e/foundation'
import { BreadcrumbTitle } from '@utilities/breadcrumb-utils'
import { Path } from '@constants/paths'
import { useNavigate } from 'react-router-dom'

export type BreadcrumbPage = {
    title: BreadcrumbTitle
    pageToNavigate?: Path
}

const useBreadcrumb = (
    pageTitles: BreadcrumbPage[],
    viewportSize: DeviceName,
) => {
    const navigate = useNavigate()

    const isMobile =
        viewportSize === DeviceName.phone || viewportSize === DeviceName.tablet

    const getItemBreadcrumb = (
        title: BreadcrumbTitle,
        pageToNavigate: string,
        index: number,
    ) => (
        <ItemBreadcrumb
            label={title}
            key={title}
            activeItem={index !== pageTitles.length - 1}
            arrow={index !== pageTitles.length - 1}
            onClick={() => navigate(pageToNavigate)}
        />
    )

    const breadcrumb = (
        <Breadcrumb>
            {pageTitles.map(({ title, pageToNavigate }, index) =>
                getItemBreadcrumb(title, pageToNavigate || '', index),
            )}
        </Breadcrumb>
    )

    return {
        breadcrumb,
    }
}

export default useBreadcrumb
