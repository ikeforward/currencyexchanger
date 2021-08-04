import axios from 'axios'
import { getRateOK, getRateNOK, getRateHistoryOK, getRateHistoryNOK } from './Actions'
import moment from 'moment'

export const getExchangeRate = () => (dispatch) => {
    axios.get('https://api.nomics.com/v1/exchange-rates?key=866ee136a53e7e6d95b21f24de162617b1101f7c')
        .then(result => {
            dispatch(getRateOK(result.data))
        })
        .catch(e => dispatch(getRateNOK()))
}

export const getExchangeRateHistory = (duration = 7, currency = 'EUR') => (dispatch) => {
    const start = moment().subtract(duration, 'days').toISOString()
    axios.get(encodeURI(`https://api.nomics.com/v1/exchange-rates/history?key=866ee136a53e7e6d95b21f24de162617b1101f7c&currency=${currency}&start=${start}`))
        .then(result => {
            dispatch(getRateHistoryOK(result.data))
        })
        .catch(e => dispatch(getRateHistoryNOK()))
}