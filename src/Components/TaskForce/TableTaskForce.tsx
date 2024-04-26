import { Table } from "antd"
const TableTaskForce = () => {

    const columns = [
            {
                title: 'Date Time Issued',
                dataIndex: 'issued_date_time',
                key: 'issued_date_time'
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
        />
    )
}

export default TableTaskForce;