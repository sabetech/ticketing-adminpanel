import { Table } from "antd"
import { Ticket } from "../../Types/Tickets"
import dayjs from "dayjs"

type TableTaskForceProps = {
    tickets: Ticket[]
}

const TableTaskForce: React.FC<TableTaskForceProps> = ({ tickets }) => {

    const columns = [
            {
                title: 'Date Time Issued',
                dataIndex: 'issued_date_time',
                key: 'issued_date_time',
                render: (value) => dayjs(value).format('DD MMM YYYY HH:mm')
            },
            {
                title: 'Car Number',
                dataIndex: 'car_number',
                key: 'car_number'
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
                title: 'Action',
                dataIndex: '',
                key: 'amount'
            }
    ]

    return (
        <Table 
            columns={columns}
            dataSource={tickets}
        />
    )
}

export default TableTaskForce;