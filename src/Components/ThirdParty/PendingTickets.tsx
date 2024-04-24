import { Table, Tag } from "antd";
import { Ticket } from "../../Types/Tickets";
import type { TableProps } from 'antd';
import dayjs from "dayjs";

type PendingTicketsProps = {
    isLoading: boolean
    tickets: Ticket[]
}

const PendingTickets:React.FC<PendingTicketsProps> = ({isLoading, tickets}) => {

    const columns: TableProps<any>['columns'] = [
        {
            title: 'Date',
            dataIndex: 'issued_date_time',
            key: 'date',
            width: '13%',
            render: (val:string) => dayjs(val).format("DD MMM YYYY h:mm A")
        },
        {
            title: 'Client',
            dataIndex: 'title',
            key: 'client',
            width: '15%',
        },
        {
            title: 'Car Number',
            dataIndex: 'car_number',
            key: 'car_number',
            width: '10%',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Payment Status',
            dataIndex: 'paid',
            key: 'paid',
            render: (val) => <Tag color={val == 1?"green":"red"}>{val == 1 ? "Paid":"Not Paid"}</Tag>
        }
    ]

    return (
        <Table 
            columns={columns}
            loading={isLoading}
            dataSource={tickets}
            scroll={{y: 410}}
        />
    );
}

export default PendingTickets;