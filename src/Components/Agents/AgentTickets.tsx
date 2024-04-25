import { Table, TableProps, Space, Button, Popconfirm } from "antd";
import { Ticket } from "../../Types/Tickets";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

type AgentTicketsProp = {
    agentTickets: Ticket[] | undefined
}

const AgentTickets = ({agentTickets}:AgentTicketsProp) => {

    const handleDeleteConfirm = (id: number) => {

    }

    const handleTicketEdit = (rec: Ticket) => {

    }

    const columns: TableProps<Ticket>['columns'] = [
        {
            title: 'Ticket ID',
            dataIndex: 'title',
            key: 'ticket_id',
        },
        {
            title: 'Ticket Type',
            dataIndex: 'rate',
            key: 'ticket_type',
            render: (value) => value.title
        },
        {
            title: 'Car Number or Subject',
            dataIndex: 'car_number',
            key: 'car_number',
        },
        {
            title: 'Ticket Cost',
            dataIndex: 'amount',
            key: 'ticket_cost',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (_, record: Ticket) => <Space size="middle">
                <Button icon={<EditFilled />} onClick={() => handleTicketEdit(record)}>Edit</Button>
                <Popconfirm
                    title="Delete the User"
                    description="Are you sure to delete this Rate?"
                    onConfirm={ () => handleDeleteConfirm(record.id) }
                    onCancel={() =>{}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteFilled />} 
                        
                    />
                </Popconfirm>
            </Space>
        }
    ]


    return (
        <>
            <Table 
                style={{width: '60vw'}}
                columns={columns}
                dataSource={agentTickets}
                scroll={{y: 500}}
            />
        </>
    )
}

export default AgentTickets;