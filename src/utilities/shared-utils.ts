// import { ERROR_MSG } from '@constants/errorMessage';

const currencyFilter = (value = '') => {
    let formattedValue = ''
    try {
        if (
            Number.isInteger(Number(value)) ||
            (value.length === 8 && value.indexOf(',') === value.length - 3)
        ) {
            formattedValue = value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        } else {
            formattedValue = value.startsWith(',')
                ? `0.${value.split(',')[1].substring(0, 2)}`
                : parseFloat(value.replace(',', '.')).toFixed(3)
        }
    } catch (e) {
        return '0'
    }
    return formattedValue
}

enum FONTSIZE {
    'A' = '16px',
    'A+' = '18px',
    'A++' = '20px',
}

const getUserFontSize = (type: string) => {
    if (type === 'A+') {
        return FONTSIZE['A+']
    }
    if (type === 'A++') {
        return FONTSIZE['A++']
    }
    // default base font size
    return FONTSIZE.A
}

const capitalCase = (name: string) => {
    return name
        .toLowerCase()
        .split(' ')
        .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
}

export { currencyFilter, capitalCase, getUserFontSize }
