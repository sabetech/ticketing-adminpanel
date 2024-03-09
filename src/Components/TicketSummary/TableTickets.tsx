import { Space, Table } from "antd";
import type { TableProps } from 'antd';



const TableTickets: React.FC = () => {

    type ColumnProps = {
        key: string;
        agent: string;
        ticketsIssued: number;
        amount: number;
        station: string
      }

    const columns: TableProps<ColumnProps>['columns'] = [
        {
            title: 'Ticket No',
            dataIndex: 'ticket_no',
            key: 'ticket_no'
        },
        {
            title: 'Car Number',
            dataIndex: 'car_number',
            key: 'car_number'
        },
        {
            title: 'Station',
            dataIndex: 'station',
            key: 'station'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Agent',
            dataIndex: 'agent', 
            key: 'agent'
        },
        {
            title: 'Date & time',
            dataIndex: 'date_time',
            key: 'date_time'
        }
    ]

    return (
        <>
            <Table 
                columns={columns}  
                dataSource={[]} 
            />
        </>
    )
}

export default  TableTickets;