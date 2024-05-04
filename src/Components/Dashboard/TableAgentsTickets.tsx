import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import type { TableProps } from 'antd';
import { getAgentTicketTotals } from '../../Services/AgentService'

const TableAgentsTickets = ({date}) => {

    const {data: agentTicketTotals, isFetched} = useQuery({
        queryKey: ['agentTicketTotals'],
        queryFn: async () => getAgentTicketTotals(date)
    });

    console.log("agent Ticket totals", agentTicketTotals)

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
            dataIndex: 'fname',
            key: 'agent'
        },
        {
            title: 'Tickets Issued',
            dataIndex: 'tickets_issued',
            key: 'ticketsIssued'
        },
        {
            title: 'Amount',
            dataIndex: 'total',
            key: 'amount'
        }
    ]

    return (
        <Table 
            columns={columns}
            dataSource={isFetched && agentTicketTotals.data}
            pagination={false} 
        />
    )
}

export default TableAgentsTickets;