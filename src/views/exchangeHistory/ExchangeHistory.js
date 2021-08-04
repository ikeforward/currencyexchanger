import React, { useState } from 'react'
import './ExchangeHistory.less'
import { Select, Radio } from 'antd'
import ExchangeHistoryTable from './ExchangeHistoryTable'
import ExchangeHistoryChart from './ExchangeHistoryChart'

const { Option } = Select

const ExchangeHistory = (props) => {
    const [type, setType] = useState('table')

    return <div className='currx-exchange-history'>
        <div className='currx-section-title'>
            Exchange History
        </div>

        <div className='currx-section-options'>
            <span className='currx-exchange-history-duration'>
                <div className='currx-body-header-text'>From</div>
                <Select defaultValue='7 days' onChange={(value) => !!props.onExchangeHistoryChanged && props.onExchangeHistoryChanged(value)}>
                    <Option value={7}>7 days</Option>
                    <Option value={14}>14 days</Option>
                    <Option value={30}>30 days</Option>
                </Select>
            </span>

            <span>
                <Radio.Group value={type} onChange={event => setType(event.target.value)}>
                    <Radio value='table'>Table</Radio>
                    <Radio value='chart'>Chart</Radio>
                </Radio.Group>
            </span>
        </div>

        {
            type !== 'chart' ? <ExchangeHistoryTable data={props.historyRates} /> : <ExchangeHistoryChart data={props.historyRates} />
        }
    </div>
}

export default ExchangeHistory