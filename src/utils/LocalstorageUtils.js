import moment from 'moment'

export const LOCA_STORAGE_KEY = 'CURRENCY_EXCHANGER'
export const ENTRY_FORMAT = 'DD/MM/YYYY @ HH:mm'

export const getSavedConversions = () => {
    return !!localStorage.getItem(LOCA_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCA_STORAGE_KEY)) : {}
}

export const saveNewConvert = (info) => {
    const saved = getSavedConversions()
    const now = moment()
    saved[now.valueOf()] = {event: info, timestamp: now.valueOf()}
    localStorage.setItem(LOCA_STORAGE_KEY, JSON.stringify(saved))
}

export const deleteConversion = (key) => {
    const saved = getSavedConversions()
    delete saved[key]
    localStorage.setItem(LOCA_STORAGE_KEY, JSON.stringify(saved))
}