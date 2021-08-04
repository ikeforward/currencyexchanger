import React from 'react'
import ReactDOM from 'react-dom'
import CurrencyExchangerContainer from './views/CurrencyExchangerContainer'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './states/Store'
import 'antd/dist/antd.css'
import './Global.less'

ReactDOM.render(<Provider store={store}>
  <CurrencyExchangerContainer />
</Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
