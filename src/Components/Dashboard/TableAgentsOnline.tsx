import { Table } from "antd";
import type { TableProps } from 'antd';
import { TAgentOnlineStatus } from '../../Types/Agent'

const TableAgentsOnline = ({agentsOnline}) => {
    type ColumnProps = {
        key: string;
        agent: string;
        station: string;
      }

    const columns: TableProps<ColumnProps>['columns'] = [
        {
            title: 'Agent',
            dataIndex: 'agent',
            key: 'agent',
            render: (value: TAgentOnlineStatus) => value.agent.fname +" "+value.agent.lname
        }, 
        {
            title: 'Station',
            dataIndex: 'station',
            key: 'station'
        },
    ]

    return (
        <Table 
            columns={columns}
            dataSource={agentsOnline}
        />
    )
}

export default TableAgentsOnline;