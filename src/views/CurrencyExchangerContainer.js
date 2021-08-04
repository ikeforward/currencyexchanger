import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyExchanger from './CurrencyExchanger'
import { getExchangeRate, getExchangeRateHistory } from './../states/Api'
import { deleteConversion, saveNewConvert, getSavedConversions } from '../utils/LocalstorageUtils'

const CurrencyExchangerContainer = () => {

    useEffect(() => {
        dispatch(getExchangeRate())

        // Due to basic license of Nomics, maximum 1 request can be sent within 1 second
        setTimeout(() => {
            dispatch(getExchangeRateHistory())
        }, 2000)
    // eslint-disable-next-line
    }, [])

    const [saveConversions, setSavedConversions] = useState([])
    const dispatch = useDispatch()
    const rates = useSelector(state => state?.default?.rates) || {}
    const historyRates = useSelector(state => state?.default?.historyRates) || []

    const onCurrencyConverted = (state) => {
        saveNewConvert(state)
    }

    const onExchangeHistoryChanged = (duration) => {
        dispatch(getExchangeRateHistory(duration))
    }

    const onConversionHistoryDelete = (key) => {
        deleteConversion(key)
        setSavedConversions(Object.values(getSavedConversions()))
    }

    const onTabChange = () => {
        setSavedConversions(Object.values(getSavedConversions()))
      }

    return <CurrencyExchanger rates={rates} historyRates={historyRates} saveConversions={saveConversions}
        onCurrencyConverted={onCurrencyConverted}
        onExchangeHistoryChanged={onExchangeHistoryChanged} 
        onConversionHistoryDelete={onConversionHistoryDelete}
        onTabChange={onTabChange}/>
}

export default CurrencyExchangerContainer