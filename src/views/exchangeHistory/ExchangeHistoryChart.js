import React from 'react'
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines'

const ExchangeHistoryChart = (props) => {
    return <div className='currx-exchange-history-chart'>
        <Sparklines data={props.data.map(historyRate => historyRate.rate)}>
            <SparklinesLine />
            <SparklinesReferenceLine type='max' />
            <SparklinesReferenceLine type='avg' />
            <SparklinesReferenceLine type='min' />
        </Sparklines>
    </div>
}

export default ExchangeHistoryChart