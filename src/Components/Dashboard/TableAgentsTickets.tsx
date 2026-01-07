import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import type { TableProps } from 'antd';
import { getAgentTicketTotals } from '../../Services/AgentService'
import { Link } from "react-router-dom";
import { humanReadableDate } from "../../Utils/Helpers";

const TableAgentsTickets = ({date}) => {

    const {data: agentTicketTotals, isFetched, isLoading} = useQuery({
        queryKey: ['agentTicketTotals', date],
        queryFn: async () => getAgentTicketTotals(date)
    });

    type ColumnProps = {
        key: string;
        agent: string;
        ticketsIssued: number;
        amount: number;
        agent_name: string
        loggedin_at: string
        loggedout_at: string
      }

    const columns: TableProps<ColumnProps>['columns'] = [
    
        {
            title: 'Agent',
            dataIndex: 'fname',
            key: 'agent',
            render: (val, rec) => <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <Link to={`/agent-summary/${rec.agent_name}/detail?date=${date}`}>{val}</Link>
                <Tag color="success">Login: {humanReadableDate(rec.loggedin_at)}</Tag>
                <Tag color="error">Logout: {humanReadableDate(rec.loggedout_at)}</Tag>
                </div>
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
            loading={isLoading}
            rowKey="agent"
        />
    )
}

export default TableAgentsTickets;