import { Table, TableProps } from "antd";
import { Ticket } from "../../Types/Tickets";

type AgentTicketsProp = {
    agentTickets: Ticket[] | undefined
}

const AgentTickets = ({agentTickets}:AgentTicketsProp) => {

    const columns: TableProps<Ticket>['columns'] = [
        {
            title: 'Ticket ID',
            dataIndex: 'title',
            key: 'ticket_id',
        },
        {
            title: 'Ticket Type',
            dataIndex: 'ticket_type',
            key: 'ticket_type',
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
            title: 'Station',
            dataIndex: 'station',
            key: 'station',
        }
    ]


    return (
        <>
            <Table 
                style={{width: '50vw'}}
                columns={columns}
                dataSource={agentTickets}
                scroll={{y: 500}}
            />
        </>
    )
}

export default AgentTickets;