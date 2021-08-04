import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyExchanger from './CurrencyExchanger'
import { getExchangeRate, getExchangeRateHistory } from './../states/Api'
import { deleteConversion, saveNewConvert, getSavedConversions } from '../utils/LocalstorageUtils'

const CurrencyExchangerContainer = () => {

    const currentCurrencyRef = useRef()

    useEffect(() => {
        dispatch(getExchangeRate())
    // eslint-disable-next-line
    }, [])

    const [saveConversions, setSavedConversions] = useState([])
    const dispatch = useDispatch()
    const rates = useSelector(state => state?.default?.rates) || {}
    const historyRates = useSelector(state => state?.default?.historyRates) || []

    const onCurrencyConverted = (state) => {
        saveNewConvert(state)
        dispatch(getExchangeRateHistory(7, state.from))
        currentCurrencyRef.current = state.from
    }

    const onExchangeHistoryChanged = (duration) => {
        dispatch(getExchangeRateHistory(duration, currentCurrencyRef.current))
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