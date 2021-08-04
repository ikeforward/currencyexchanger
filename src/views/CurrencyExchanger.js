import React, { useState } from 'react'
import { Tabs } from 'antd'
import './CurrencyExchanger.less'
import CurrencyConverter from './converter'
import ConversionHistory from './conversionHistory'
import ExchangeHistory from './exchangeHistory/ExchangeHistory'
import { SearchOutlined } from '@ant-design/icons';

const { TabPane } = Tabs

const CurrencyExchanger = (props) => {
  const [activeKey, setActiveKey] = useState('currencyConverter')
  const [conversionToLoad, setConversionToLoad] = useState()

  const onTabChange = (newActiveKey) => {
    newActiveKey === 'conversionHistory' && props.onTabChange()
    setActiveKey(newActiveKey)
  }

  const onViewRow = (conversion) => {
    setConversionToLoad(conversion)
    setActiveKey('currencyConverter')
  }

  const getLeftBarContent = () => {
    return <React.Fragment>
       <SearchOutlined />
       <span>Current Exchanger</span>
    </React.Fragment>
  }

  return <div className='currx-home'>
    <Tabs tabBarExtraContent={{left: getLeftBarContent()}} activeKey={activeKey} onChange={onTabChange}>
      <TabPane tab='CURRENCY CONVERTER' key='currencyConverter'>
        <CurrencyConverter rates={props.rates} conversionToLoad={conversionToLoad} onCurrencyConverted={props.onCurrencyConverted}/>
        <ExchangeHistory historyRates={props.historyRates} onExchangeHistoryChanged={props.onExchangeHistoryChanged}/>
      </TabPane>
      <TabPane tab='VIEW CONVERSION HISTORY' key='conversionHistory'>
        <ConversionHistory data={props.saveConversions} onDeleteRow={props.onConversionHistoryDelete} onViewRow={onViewRow}/>
      </TabPane>
    </Tabs>
  </div>
}

export default CurrencyExchanger
