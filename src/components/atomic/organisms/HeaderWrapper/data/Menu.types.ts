export type SubCategory = {
    name: string
    nameAriaLabel?: string
    url?: string
    urlAriaLabel?: string
    subCategories?: SubCategory[]
    notShowOnDevices?: Device[]
}

export type Featured = {
    name: string
    nameAriaLabel?: string
    description: string
    descriptionAriaLabel?: string
    url: string
    urlAriaLabel?: string
    ctaText: string
    ctaTextAriaLabel?: string
}

type Device = 'phone' | 'tablet' | 'laptop' | 'desktop'

export type Category = {
    name: string
    nameAriaLabel?: string
    url: string
    specialDisplay?: boolean
    urlAriaLabel?: string
    featured?: Featured | undefined
    subCategories?: SubCategory[] | undefined
}
