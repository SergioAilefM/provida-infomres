type DateJson = {
    y: number
    m: number
    d: number
}

const today = (): DateJson => {
    const todayArr = new Date().toISOString().split('T')[0].split('-')
    const todayDateJson: DateJson = {
        y: Number(todayArr[0]),
        m: Number(todayArr[1]),
        d: Number(todayArr[2]),
    }
    return todayDateJson
}

const nextMonths = (monthNumber: number): DateJson => {
    const todayArr = new Date().toISOString().split('T')[0].split('-')
    let year = Number(todayArr[0])
    let month = Number(todayArr[1])
    const day = Number(todayArr[2])

    if (month + monthNumber > 12) {
        year += 1
        month = month + monthNumber - 12
    } else {
        month += monthNumber
    }

    const todayDateJson: DateJson = {
        y: year,
        m: month,
        d: day,
    }
    return todayDateJson
}

const addZeroIfNecessary = (dayOrMonth: number) => {
    if (dayOrMonth < 10) {
        return `0${dayOrMonth}`
    }
    return dayOrMonth
}

const formatDateToString = (date: DateJson | null) => {
    if (date) {
        const day = addZeroIfNecessary(date.d)
        const month = addZeroIfNecessary(date.m)
        const year = date.y
        return `${day}/${month}/${year}`
    }
    return undefined
}

const formatValueToChilenDateString = (date: string | null) => {
    if (date && date.split('-').length > 0) {
        const dateStringArr = date.split('-')
        if (Number(dateStringArr[2]) < 10) {
            dateStringArr[2] = `0${dateStringArr[2]}`
        }
        if (Number(dateStringArr[1]) < 10) {
            dateStringArr[1] = `0${dateStringArr[1]}`
        }
        return `${dateStringArr[2]}/${dateStringArr[1]}/${dateStringArr[0]}`
    }
    return undefined
}

export { today, nextMonths, formatDateToString, formatValueToChilenDateString }
