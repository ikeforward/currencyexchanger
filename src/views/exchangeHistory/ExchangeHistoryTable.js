import React from 'react'
import { Table, Row, Col } from 'antd'
import moment from 'moment'

const data_columns = [
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: value => moment(value).format('DD/MM/YYYY')
  },
  {
    title: 'Exchange rate',
    dataIndex: 'rate',
    key: 'rate',
  }
]

const statistics_columns = [
  {
    title: 'Statistics',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '',
    dataIndex: 'value',
    key: 'value',
  }
]

const getStatisticData = (data) => {
  if(Array.isArray(data) && data.length > 0) {
    const statistics = data.reduce((accumulator, current) => {
      if(!accumulator.lowest || accumulator.lowest > current.rate) {
        accumulator.lowest = current.rate
      }
      if(!accumulator.highest || accumulator.highest < current.rate) {
        accumulator.highest = current.rate
      }
      accumulator.sum = accumulator.sum + parseFloat(current.rate)
      return accumulator
    }, {sum: 0})
  
    return [
      {
        name: 'Lowest',
        value: statistics.lowest
      },
      {
        name: 'Highest',
        value: statistics.highest
      },
      {
        name: 'Average',
        value: statistics.sum / data.length
      }
    ]
  } else {
    return [
      {
        name: 'Lowest',
        value: 0
      },
      {
        name: 'Highest',
        value: 0
      },
      {
        name: 'Average',
        value: 0
      }
    ]
  }  
}

const ExchangeHistoryTable = (props) => {
  return <div className='currx-exchange-history-table'>
    <Row gutter={24}>
      <Col span={12}>
        <Table columns={data_columns} dataSource={props.data} pagination={false} className='currx-exchange-history-rate-table'/>
      </Col>
      <Col span={12}>
        <Table columns={statistics_columns} dataSource={getStatisticData(props.data)} pagination={false} className='currx-exchange-history-statistics-table'/>
      </Col>
    </Row>
  </div>
}

export default ExchangeHistoryTable