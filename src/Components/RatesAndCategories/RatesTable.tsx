import { Table } from "antd";
import type { TableProps } from 'antd';

const RatesTable = () => {

    type ColumnProps = {
        key: string;
        agent: string;
        ticketsIssued: number;
        amount: number;
        station: string
      }

    const columns: TableProps<ColumnProps>['columns'] = [
        {
            title: 'Vehicle Category',
            dataIndex: 'vehicle_category',
            key: 'vehicle_category'
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon'
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate'
        },
        {
            title: 'Station',
            dataIndex: 'station',
            key: 'station'
        },
        {
            title: 'Pay as you Go',
            dataIndex: 'pay_as_you_go',
            key: 'pay_as_you_go'
        },
        {
            title: 'Action',
            dataIndex: 'action', 
            key: 'action'
        }
    ]


    return (
        <>
            <Table 
                columns={columns}
            />
        </>
    )

}

export default RatesTable;