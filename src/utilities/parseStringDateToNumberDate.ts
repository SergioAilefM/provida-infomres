export const parseStringDateToNumberMonth = (date: string): number => {
    if (date.split('T').length === 2) {
        const dateString: string[] = date.split('T')[0].split('-')
        return +dateString[1]
    }

    return 0
}

export const parseStringDateToNumberDay = (date: string): number => {
    if (date.split('T').length === 2) {
        const dateString: string[] = date.split('T')[0].split('-')
        return +dateString[2]
    }

    return 0
}

export const parseStringDateToOnlyDate = (date: string) => {
    if (date.split('T').length === 2) {
        const dateArray = date.split('T')[0].split('-')
        return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
    }

    return null
}
