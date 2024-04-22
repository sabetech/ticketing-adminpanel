import { useEffect, useState } from 'react';
import {Row, Col, Card, Space, Typography, AutoComplete, Button} from 'antd'
import { UserAddOutlined } from '@ant-design/icons';
import TableUsers from '../../Components/UserManagement/TableUsers';
import { useQuery } from '@tanstack/react-query';
import { AppError, RemoteResponse } from '../../Types/Remote';
import { User } from '../../Types/User';
import { getAllUsers } from '../../Services/User';
import ModalAddUsers from '../../Components/UserManagement/ModalAddUsers';
const ManageUsers = () => {

    const [usersList, setUsersList] = useState<User[]>([]);
    const [modalOpen, setModalOpen] = useState(false)

    const { data: users, isLoading, isSuccess } = useQuery<RemoteResponse<User[]> | AppError>({
        queryKey: ['users'],
        queryFn: async () => getAllUsers()
    });

    useEffect(() => {
        if (isSuccess) {
            if (users?.success) {
                setUsersList(users.data);
            }
        }
    },[users]);

    

    const onSelect = (data: string) => {
        if (users?.success) {
            const selectedUser = users.data.filter(usr => usr.fname+" "+usr.lname === data);
            setUsersList(selectedUser)
        }
    };

    const [value, setValue] = useState('');
    
    const onChange = (data: string) => {
        setValue(data);
    };

    const clearSearch = () => {
        if (users?.success) {
            setUsersList(users.data);
        }
    }

    return (
        <>
            <ModalAddUsers open={modalOpen} setModalOpen={setModalOpen}/>
            <Row>
                <Col span={23}>
                    <Card title={"Manage Users"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Search User</Typography>
                                <AutoComplete
                                    size="large"
                                    value={value}
                                    onClear={clearSearch}
                                    allowClear
                                    options={users?.success ? users.data.map( usr => ({
                                        key: usr.id,
                                        label: `${usr.fname} ${usr.lname}`,
                                        value: usr.fname +" "+usr.lname
                                    })) : [] }
                                    style={{ width: 500 }}
                                    onSelect={onSelect}
                                    onChange={onChange}
                                    placeholder="Search for Users"
                                    filterOption={(inputValue, option) => 
                                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Space>
                            <Space direction='vertical'>
                                <Typography />
                                <Button size={"large"} type={"primary"} icon={<UserAddOutlined />} onClick={() => setModalOpen(true)}>Add User</Button>
                            </Space>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop: '5vh'}}>
                <Col span={23}>
                    <TableUsers 
                        users={users?.success ?  usersList : []}
                        isLoading={isLoading}
                    />
                </Col>
            </Row>
        </>
    );

}

export default ManageUsers;