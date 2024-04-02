import { Table } from "antd";
import type { TableProps } from 'antd';
import { Ticket } from "../../Types/Tickets";
import { Rate } from "../../Types/Rate";
import { Agent } from "../../Types/Agent";
import * as utils from "../../Utils/Helpers"


type TableTicketProp = {
    ticketData: Ticket[],
    isLoading: boolean
}

const TableTickets: React.FC<TableTicketProp> = ( {ticketData, isLoading} ) => {

    const columns: TableProps<Ticket>['columns'] = [
        {
            title: 'Ticket No',
            dataIndex: 'title',
            key: 'ticket_no'
        },
        {
            title: 'Car Number',
            dataIndex: 'car_number',
            key: 'car_number'
        },
        {
            title: 'Station',
            dataIndex: 'name',
            key: 'station'
        },
        {
            title: 'Category',
            dataIndex: 'rate',
            key: 'category',
            render: (rate: Rate) => rate.rate_type.toUpperCase()
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Agent',
            dataIndex: 'agent', 
            key: 'agent',
            sorter: true,
            render: (agent: Agent) => agent.fname
        },
        {
            title: 'Date & time',
            dataIndex: 'issued_date_time',
            key: 'date_time',
            sorter: true,
            render: (dateTime: string) => utils.formatDateTime(dateTime)
        }
    ]

    return (
        <>
            <Table 
                columns={columns}  
                dataSource={ticketData} 
                loading={isLoading}
            />
        </>
    )
}

export default  TableTickets;