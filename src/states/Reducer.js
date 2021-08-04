import { Actions } from './Actions'

const DefaultReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.GET_EXCHANGE_RATE_OK:
            const rates = action.rates.reduce((accumulator, current) => {
                accumulator[current.currency] = current.rate
                return accumulator
            }, {})
            return {
                rates
            }

        case Actions.GET_EXCHANGE_RATE_HISTORY_OK:
            return {
                ...state,
                historyRates: action.historyRates
            }
        default:
            return state
    }
}

export default DefaultReducer