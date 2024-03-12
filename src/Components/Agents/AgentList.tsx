import { Table } from "antd";
import type { TableProps } from 'antd';

const AgentList = () => {
    type ColumnProps = {
        key: string;
        agentName: string;
        agentImage: string;
        email: string;
        role: string;
        station: string;
        totalTickets: number;
      }
    const columns: TableProps<ColumnProps>['columns'] = [
        {
            title: '',
            dataIndex: 'agent_img',
            key: 'agent_img',
        },
        {
            title: 'Agent Name',
            dataIndex: 'agent_name',
            key: 'agent_name',
        },
        {
            title: 'Agent Email',
            dataIndex: 'agent_email',
            key: 'agent_email',
        },
        {
            title: 'Agent Role',
            dataIndex: 'agent_role',
            key: 'agent_role',
        },
        {
            title: 'Station',
            dataIndex: 'station',
            key: 'station',
        },
        {
            title: 'Total Tickets',
            dataIndex: 'total_tickets',
            key: 'total_tickets',
        }
       

    ]

    return (
        <>
            <Table 
                columns={columns}
            />
        </>
    );
}

export default AgentList;