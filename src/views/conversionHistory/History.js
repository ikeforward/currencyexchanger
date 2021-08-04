import React from 'react'
import './History.less'
import { Table, Space, Button } from 'antd'
import { EyeFilled, DeleteFilled } from '@ant-design/icons'
import moment from 'moment'
import { ENTRY_FORMAT } from './../../utils/LocalstorageUtils'

const ConversionHistory = (props) => {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: timestamp => moment(timestamp).format(ENTRY_FORMAT)
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            render: detail => `Converted an amount of ${detail.amount} from ${detail.from} to ${detail.to}`
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 400,
            render: (text, record) => (
                <Space size='middle' className='currx-conversion-history-actions'>
                    <Button icon={<EyeFilled />} onClick={() => props.onViewRow(record.event)}>View</Button>
                    <Button icon={<DeleteFilled />} onClick={() => props.onDeleteRow(record.timestamp)}>Delete from history</Button>
                </Space>
            )
        },
    ]

    return <div className='currx-conversion-history'>
        <div className='currx-page-title'>
            Conversion history
        </div>
        <Table columns={columns} dataSource={props.data} pagination={false}/>
    </div>
}

export default ConversionHistory