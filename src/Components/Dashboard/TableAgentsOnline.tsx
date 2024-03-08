import { Table } from "antd";
import type { TableProps } from 'antd';

const TableAgentsOnline = () => {
    type ColumnProps = {
        key: string;
        agent: string;
        station: string;
      }

    const columns: TableProps<ColumnProps>['columns'] = [
        {
            title: 'Agent',
            dataIndex: 'agent',
            key: 'agent'
        }, 
        {
            title: 'Station',
            dataIndex: 'station',
            key: 'station'
        },
    ]

    return (
        <Table 
            columns={columns}
        />
    )
}

export default TableAgentsOnline;