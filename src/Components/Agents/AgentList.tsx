import { Avatar, Table } from "antd";
import type { TableProps } from 'antd';
import { Agent } from "../../Types/Agent";

type TableAgentProp = {
    agents: Agent[],
    isLoading: boolean
}

const AgentList: React.FC<TableAgentProp> = ({ agents, isLoading }) => {
    type ColumnProps = {
        key: string;
        agentName: string;
        agentImage: string;
        email: string;
        role: string;
        station: string;
        totalTickets: number;
      }
      //https://tickets.koajay.com/assets/img/profile_photos/
      //https://tickets.koajay.com/assets
    const columns: TableProps<Agent>['columns'] = [
        {
            title: '',
            dataIndex: 'photo',
            key: 'agent_img',
            render: (value) => <Avatar size={"large"} src={`https://tickets.koajay.com/assets/${value}`} />
        },
        {
            title: 'Agent Name',
            dataIndex: '',
            key: 'agent_name',
            render: (_, record) => `${record.fname} ${record.lname}`
        },
        {
            title: 'Agent Email',
            dataIndex: 'email',
            key: 'agent_email',
        },
        {
            title: 'Station',
            dataIndex: 'stationInfo',
            key: 'station',
            render: (value) => value.name
        }
    ]

    return (
        <>
            <Table 
                columns={columns}
                dataSource={agents}
                loading={isLoading}
            />
        </>
    );
}

export default AgentList;