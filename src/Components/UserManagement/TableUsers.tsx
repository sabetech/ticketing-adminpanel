import type { TableProps } from 'antd';
import { Table, Tag, Avatar, Space, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../Types/User';
import { Role } from '../../Types/User';
import * as urls from '../../Constants/Urls'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../Services/User';

type TableUsersProp = {
    isLoading: boolean
    users: User[] 
}

const TableUsers: React.FC<TableUsersProp> = ({isLoading, users}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()

    const { mutate: removeUser } = useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: (data: any) => { 
            messageApi.open({
                type: 'success',
                content: data.message,
              });
              queryClient.invalidateQueries({ queryKey: ['users'] })
        }
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
            render: (value: string) => <Avatar size={60} src={value == null ? 'https://img.icons8.com/ios-filled/50/gender-neutral-user.png' : value.includes('unknown') ? 'https://img.icons8.com/ios-filled/50/gender-neutral-user.png' : `${urls.IMAGE_BASE_URL}${value.substring(19)}`} />
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
    
    return <>
        {contextHolder}
        <Table 
            loading={isLoading}
            columns={columns}
            dataSource={users}
            scroll={{y: 480}}
            pagination={{ pageSize: 80 }}
        />
    </>
}

export default TableUsers;