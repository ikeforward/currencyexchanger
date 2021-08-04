export const Actions = {
    GET_EXCHANGE_RATE_OK: 'GET_EXCHANGE_RATE_OK',
    GET_EXCHANGE_RATE_NOK: 'GET_EXCHANGE_RATE_NOK',
    GET_EXCHANGE_RATE_HISTORY_OK: 'GET_EXCHANGE_RATE_HISTORY_OK',
    GET_EXCHANGE_RATE_HISTORY_NOK: 'GET_EXCHANGE_RATE_HISTORY_NOK'
}

export const getRateOK = (rates) => {
    return {
        type: Actions.GET_EXCHANGE_RATE_OK,
        rates
    }
}

export const getRateNOK = () => {
    return {
        type: Actions.GET_EXCHANGE_RATE_NOK
    }
}

export const getRateHistoryOK = (historyRates) => {
    return {
        type: Actions.GET_EXCHANGE_RATE_HISTORY_OK,
        historyRates
    }
}

export const getRateHistoryNOK = () => {
    return {
        type: Actions.GET_EXCHANGE_RATE_HISTORY_NOK
    }
}