import type { TableProps } from 'antd';
import { Table, Tag, Avatar, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../Types/User';
import { Role } from '../../Types/User';
import * as urls from '../../Constants/Urls'
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../../Services/User';

type TableUsersProp = {
    isLoading: boolean
    users: User[] 
}

const TableUsers: React.FC<TableUsersProp> = ({isLoading, users}) => {
     
    const { mutate: removeUser } = useMutation({
        mutationFn: (id: number) => deleteUser(id)
    });
    


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
            render: (record: User) => <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} >Edit</Button>
                <Popconfirm
                    title="Are you sure to delete this user?"
                    onConfirm={() => removeUser(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} />
                </Popconfirm>
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