import { Table } from "antd";
import type { TableProps } from 'antd';

const TableAgentsTickets = () => {
    type ColumnProps = {
        key: string;
        agent: string;
        ticketsIssued: number;
        amount: number;
        station: string
      }

    const columns: TableProps<ColumnProps>['columns'] = [
        {
            title: 'Agent',
            dataIndex: 'agent',
            key: 'agent'
        },
        {
            title: 'Tickets Issued',
            dataIndex: 'ticketsIssued',
            key: 'ticketsIssued'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
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

export default TableAgentsTickets;