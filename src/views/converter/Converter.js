import React, { useEffect, useReducer, useState } from 'react'
import './Converter.less'
import { InputNumber, Select, Button } from 'antd'
import { SwapOutlined } from '@ant-design/icons'

const { Option } = Select

const INPUT_CHANGE_TYPES = {
    AMOUNT: 'AMOUNT',
    FROM: 'FROM',
    TO: 'TO',
    SIWTCH: 'SWITCH',
    LOAD: 'LOAD'
}

const InputsReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE_TYPES.AMOUNT:
            return {
                ...state,
                amount: action.value
            }

        case INPUT_CHANGE_TYPES.FROM:
            return {
                ...state,
                from: action.value
            }

        case INPUT_CHANGE_TYPES.TO:
            return {
                ...state,
                to: action.value
            }

        case INPUT_CHANGE_TYPES.SIWTCH:
            return {
                ...state,
                from: state.to,
                to: state.from
            }

        case INPUT_CHANGE_TYPES.LOAD:
            return {...action.value}

        default:
            throw new Error()
    }
}

const CurrencyConverter = (props) => {
    const [state, dispatch] = useReducer(InputsReducer, { from: 'EUR', to: 'USD' })
    const [convertedRate, setConvertedRate] = useState(0)

    useEffect(() => {
        if(!!props.conversionToLoad) {
            dispatch({ type: INPUT_CHANGE_TYPES.LOAD, value: props.conversionToLoad })
            convertCurrency(props.conversionToLoad)
        } 
    // eslint-disable-next-line
    }, [props.conversionToLoad])

    const convertCurrency = (conversionInfo = state) => {
        const currencyFromRate = props.rates[conversionInfo.from]
        const currencyToRate = props.rates[conversionInfo.to]
        setConvertedRate(currencyFromRate / currencyToRate)
        !!props.onCurrencyConverted && props.onCurrencyConverted(conversionInfo)
    }

    const onInputsChange = (type, value) => {
        dispatch({ type, value })
        setConvertedRate(0)
    }

    return <div className='currx-currency-converter'>
        <div className='currx-page-title'>
            I want to convert
        </div>

        <div className='currx-currency-converter-inputs'>
            <span>
                <div className='currx-body-header-text'>Amount</div>
                <InputNumber min={0} value={state.amount} onChange={(value) => onInputsChange(INPUT_CHANGE_TYPES.AMOUNT, value)} />
            </span>

            <span>
                <div className='currx-body-header-text'>From</div>
                <Select value={state.from} onChange={(value) => onInputsChange(INPUT_CHANGE_TYPES.FROM, value)}>
                    {
                        Object.keys(props.rates).map(rate => <Option key={rate} value={rate}>{rate}</Option>)
                    }
                </Select>
            </span>

            <Button icon={<SwapOutlined />} className='currx-switch-btn' onClick={() => onInputsChange(INPUT_CHANGE_TYPES.SIWTCH)} />

            <span>
                <div className='currx-body-header-text'>To</div>
                <Select value={state.to} onChange={(value) => onInputsChange(INPUT_CHANGE_TYPES.TO, value)}>
                    {
                        Object.keys(props.rates).map(rate => <Option key={rate} value={rate}>{rate}</Option>)
                    }
                </Select>
            </span>

            <Button className='currx-convert-btn' disabled={!state || !state.amount} onClick={() => convertCurrency()}>CONVERT</Button>
        </div>

        <div className='currx-currency-converter-results'>
            {
                convertedRate !== 0 ?
                <React.Fragment>
                    <div>
                        <span>{state.amount} {state.from} = </span>
                        <span>{(state.amount * convertedRate).toFixed(3)} {state.to}</span>
                    </div>
                    <div>
                        1 {state.from} = {convertedRate.toFixed(6)} {state.to}
                    </div>
                    <div>
                        1 {state.to} = {(1 / convertedRate).toFixed(6)} {state.from}
                    </div>
                </React.Fragment>
                : <div>No conversion yet.</div>
            }
        </div>
    </div>
}

export default CurrencyConverter