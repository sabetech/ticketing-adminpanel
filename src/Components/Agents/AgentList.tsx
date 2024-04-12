import { Avatar, Table } from "antd";
import type { TableProps } from 'antd';
import { Agent } from "../../Types/Agent";
import { Link } from "react-router-dom";
import { Station } from "../../Types/Station";
import * as urls from "../../Constants/Urls"

type TableAgentProp = {
    agents: Agent[],
    isLoading: boolean
}

const AgentList: React.FC<TableAgentProp> = ({ agents, isLoading }) => {
    
    const columns: TableProps<Agent>['columns'] = [
        {
            title: '',
            dataIndex: 'photo',
            key: 'agent_img',
            width: '10%',
            render: (value) => <Avatar size={60} src={`${urls.IMAGE_BASE_URL}${value}`} />
        },
        {
            title: 'Agent Name',
            dataIndex: '',
            key: 'agent_name',
            width: '25%',
            render: (_, record: Agent) => <Link to={`${record.id}/detail`}>{record.fname} {record.lname}</Link>
        },
        {
            title: 'Agent Email',
            dataIndex: 'email',
            key: 'agent_email',
            width: '25%',
        },
        {
            title: 'Station',
            dataIndex: 'stationInfo',
            key: 'station',
            render: (value: Station) => value?.name ?? "No Station",
            width: '25%',
        }
    ]

    return (
        <>
            <Table 
                columns={columns}
                dataSource={agents}
                loading={isLoading}
                scroll={{ y: 500 }}
            />
        </>
    );
}

export default AgentList;