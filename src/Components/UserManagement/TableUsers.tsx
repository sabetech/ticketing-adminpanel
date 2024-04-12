import type { TableProps } from 'antd';
import { Table, Tag, Avatar, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../Types/User';
import { Role } from '../../Types/User';
import * as urls from '../../Constants/Urls'

type TableUsersProp = {
    isLoading: boolean
    users: User[]
}

const TableUsers: React.FC<TableUsersProp> = ({isLoading, users}) => {
    
    const columns: TableProps<User>['columns'] = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'user_id'
        },
        {
            title: 'Picture',
            dataIndex: 'photo',
            key: 'image_url',
            render: (value: string) => <Avatar size={60} src={`${urls.IMAGE_BASE_URL}${value}`} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record: User) => `${record.fname} ${record.lname}`
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'role',
            render: (value: Role[]) => <Tag>{value.length > 0 ? value[0].name : ""}</Tag>
        },
        {
            title: 'Status',
            dataIndex: '',
            key: 'status',
            render: (_, record) => record.deleted_at ? <Tag color="red">Inactive</Tag> : <Tag color="green">Active</Tag>

        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'action',
            render: () => <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} >Edit</Button>
                <Button type="primary" danger icon={<DeleteOutlined />} />
            </Space>

        },
    ]
    
    return <Table 
            loading={isLoading}
            columns={columns}
            dataSource={users}
            scroll={{y: 480}}
        />
}

export default TableUsers;