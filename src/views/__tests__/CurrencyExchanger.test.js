import { mount } from 'enzyme'
import CurrencyExchanger from '../CurrencyExchanger'
import { act } from 'react-dom/test-utils'

const TEST_RATES = {
    AED: '0.27224219',
    AFN: '0.01250006',
    ALL: '0.00977841',
    AMD: '0.00204838',
    ANG: '0.55711548',
    AOA: '0.00156602',
    ARS: '0.01033199'
}

const TEST_HISTORY_RATES = [
    {timestamp: '2021-07-28T00:00:00Z', rate: '1.1821728336682823'},
    {timestamp: '2021-07-29T00:00:00Z', rate: '1.1845534233593935'},
    {timestamp: '2021-07-30T00:00:00Z', rate: '1.1891454800580303'}
]

const TEST_SAVED_CONVERSIONS = []

describe('Currency exchanger', () => {
    test('Initial render', () => {
        const wrapper = mount(<CurrencyExchanger rates={TEST_RATES} historyRates={TEST_HISTORY_RATES} saveConversions={TEST_SAVED_CONVERSIONS}/>)
        expect(wrapper.length).toEqual(1)
        expect(wrapper.find('div.ant-tabs-tab').length).toEqual(2)
        expect(wrapper.find('div.ant-tabs-tab').at(0).find('div.ant-tabs-tab-btn').text()).toEqual('CURRENCY CONVERTER')
        expect(wrapper.find('div.ant-tabs-tab').at(1).find('div.ant-tabs-tab-btn').text()).toEqual('VIEW CONVERSION HISTORY')

        expect(wrapper.find('div.currx-currency-converter-inputs').find('span.ant-select-selection-item').at(0).text()).toEqual('EUR')
        expect(wrapper.find('div.currx-currency-converter-inputs').find('span.ant-select-selection-item').at(1).text()).toEqual('USD')

        expect(wrapper.find('div.currx-exchange-history-rate-table').find('tbody').children().length).toEqual(3)
        expect(wrapper.find('div.currx-exchange-history-rate-table').find('tbody').childAt(0).find('td').at(0).text()).toEqual('28/07/2021')
        expect(wrapper.find('div.currx-exchange-history-rate-table').find('tbody').childAt(0).find('td').at(1).text()).toEqual('1.1821728336682823')
        expect(wrapper.find('div.currx-exchange-history-rate-table').find('tbody').childAt(1).find('td').at(0).text()).toEqual('29/07/2021')
        expect(wrapper.find('div.currx-exchange-history-rate-table').find('tbody').childAt(1).find('td').at(1).text()).toEqual('1.1845534233593935')
        expect(wrapper.find('div.currx-exchange-history-rate-table').find('tbody').childAt(2).find('td').at(0).text()).toEqual('30/07/2021')
        expect(wrapper.find('div.currx-exchange-history-rate-table').find('tbody').childAt(2).find('td').at(1).text()).toEqual('1.1891454800580303')

        expect(wrapper.find('div.currx-exchange-history-statistics-table').find('tbody').children().length).toEqual(3)
        expect(wrapper.find('div.currx-exchange-history-statistics-table').find('tbody').childAt(0).find('td').at(0).text()).toEqual('Lowest')
        expect(wrapper.find('div.currx-exchange-history-statistics-table').find('tbody').childAt(0).find('td').at(1).text()).toEqual('1.1821728336682823')
        expect(wrapper.find('div.currx-exchange-history-statistics-table').find('tbody').childAt(1).find('td').at(0).text()).toEqual('Highest')
        expect(wrapper.find('div.currx-exchange-history-statistics-table').find('tbody').childAt(1).find('td').at(1).text()).toEqual('1.1891454800580303')
        expect(wrapper.find('div.currx-exchange-history-statistics-table').find('tbody').childAt(2).find('td').at(0).text()).toEqual('Average')
    })

    test('Convert currency', () => {
        const currencyConverterHandler = jest.fn()
        const wrapper = mount(<CurrencyExchanger rates={TEST_RATES} historyRates={TEST_HISTORY_RATES} saveConversions={TEST_SAVED_CONVERSIONS}
            onCurrencyConverted={currencyConverterHandler}/>)
        expect(wrapper.length).toEqual(1)
        expect(wrapper.find('div.ant-input-number-input-wrap').find('input').prop('value')).toEqual("")
        expect(wrapper.find('button.currx-convert-btn').prop('disabled')).toEqual(true)

        act(() => {wrapper.find('InputNumber').prop('onChange')(100)})
        wrapper.update()
        expect(wrapper.find('div.ant-input-number-input-wrap').find('input').prop('value')).toEqual("100")
        expect(wrapper.find('button.currx-convert-btn').prop('disabled')).toEqual(false)

        wrapper.find('button.currx-convert-btn').prop('onClick')()
        expect(currencyConverterHandler).toHaveBeenCalledWith({amount: 100, from: 'EUR', to: 'USD'})
    })

    test('Change currency history view', () => {
        const wrapper = mount(<CurrencyExchanger rates={TEST_RATES} historyRates={TEST_HISTORY_RATES} saveConversions={TEST_SAVED_CONVERSIONS}/>)
        expect(wrapper.length).toEqual(1)
        expect(wrapper.find('div.currx-exchange-history-rate-table').length).toEqual(1)
        expect(wrapper.find('div.currx-exchange-history-statistics-table').length).toEqual(1)
        expect(wrapper.find('div.currx-exchange-history-chart').length).toEqual(0)

        act(() => {wrapper.find('.ant-radio').at(1).find('input').prop('onChange')({target: {value: 'chart'}})})
        wrapper.update()
        expect(wrapper.find('div.currx-exchange-history-rate-table').length).toEqual(0)
        expect(wrapper.find('div.currx-exchange-history-statistics-table').length).toEqual(0)
        expect(wrapper.find('div.currx-exchange-history-chart').length).toEqual(1)
    })
})