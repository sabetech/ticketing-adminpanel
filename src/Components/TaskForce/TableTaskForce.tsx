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
                key: 'car_number',
                render: (val: string) => val.toUpperCase()
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
                render: (_, record: any) => record.fname +" "+record.lname
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
            virtual={true}
            pagination={{
                defaultPageSize: 100, 
                pageSizeOptions: ['100', '200', '300']
            }}
            style={{width: '60vw'}}
        />
    )
}

export default TableTaskForce;