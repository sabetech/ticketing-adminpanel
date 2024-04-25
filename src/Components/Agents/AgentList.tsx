import { Avatar, Dropdown, Table, Tag, Button, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { MenuProps } from 'antd';
import { Agent } from "../../Types/Agent";
import { Link } from "react-router-dom";
import * as urls from "../../Constants/Urls";

type TableAgentProp = {
    agents: Agent[],
    isLoading: boolean
}

const AgentList: React.FC<TableAgentProp> = ({ agents, isLoading }) => {

    const items: MenuProps['items'] = [
        {
          label: 'Achimota Transport Terminal',
          key: '1',
        },
        {
            label: 'Circle Interchange Bus Terminal',
            key: '2',
          }
      ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const columns: TableProps<Agent>['columns'] = [
        {
            title: '',
            dataIndex: 'photo',
            key: 'agent_img',
            width: '10%',
            render: (value) => <Avatar size={60} src={value.includes('unknown') ? 'https://img.icons8.com/ios-filled/50/gender-neutral-user.png' : `${urls.IMAGE_BASE_URL}${value.substring(19)}`} />
        },
        {
            title: 'Agent Name',
            dataIndex: '',
            key: 'agent_name',
            width: '25%',
            render: (_, record: Agent) => <>
                <Link to={`${record.id}/detail`}>{record.fname} {record.lname}</Link> <Tag>{record?.stationInfo?.name ?? 'No Station'}</Tag>
                </>
        },
        {
            title: 'Agent Email',
            dataIndex: 'email',
            key: 'agent_email',
            width: '25%',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: () =>( <Dropdown menu={menuProps}>
                            <Button>
                                <Space>
                                    Change Station
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>),
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