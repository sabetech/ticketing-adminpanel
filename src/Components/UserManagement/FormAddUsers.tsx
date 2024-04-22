import { Form, Input, Space, Select, Button, Upload, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from "antd/es/form/Form";
import { getRoles } from "../../Services/User";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Role, UserRequest } from "../../Types/User";
import { RemoteResponse, AppError } from "../../Types/Remote";
import { addUser } from '../../Services/User';
import { getStations } from '../../Services/Station';
import { Station } from "../../Types/Station";

type FormAddUsersProps = {
    setModalOpen: any
}
const FormAddUsers:React.FC<FormAddUsersProps> = ({setModalOpen}) => {
    const [form] = useForm();
    const { data: roles } = useQuery<RemoteResponse<Role[]> | AppError>({
        queryKey: ['roles'],
        queryFn: async () => getRoles()
    });
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage();


    const { data: stations } = useQuery<RemoteResponse<Station[]> | AppError>({
        queryKey: ['stations'],
        queryFn: async () => getStations()
    });

    const { mutate: createUser, isPending } = useMutation({
        mutationFn: (userValues: UserRequest) => {
            return addUser(userValues)
        }, 
        onSuccess: (data: any) => { 
            setModalOpen(false)
            messageApi.open({
                type: 'success',
                content: data.message,
              });
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })

    const onFinish = (values: UserRequest) => {
       createUser(values);
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

    return (
    <>
    {contextHolder}
        <Form
            form={form}
            size={'large'}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label={'Username'}
                name={'username'}
                rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
            >
                <Input placeholder={'Username'}/>
            </Form.Item>

            <Space direction="horizontal" style={{width: '100%'}}>
                <Form.Item
                    label={'First Name'}
                    name={'fname'}
                    rules={[
                        {
                        required: true,
                        message: 'Please input your First Name!',
                        },
                    ]}
                >
                    <Input placeholder="First name here"/>
                </Form.Item>

                <Form.Item
                    label={'Last Name'}
                    name={'lname'}
                    style={{'width': '170%'}}
                    rules={[
                        {
                        required: true,
                        message: 'Please input your Last Name!',
                        },
                    ]}
                >
                    <Input placeholder="Last name here"/>
                </Form.Item>
            </Space>
            <Space direction="horizontal">
                <Form.Item
                    label={'Phone number'}
                    name={'phone'}
                    style={{width: '90%'}}
                    rules={[
                        {
                        required: true,
                        message: 'Please input your Phone Number!',
                        },
                    ]}
                >
                    <Input addonBefore={'+233'} style={{ width: '100%' }} placeholder="549999999"/>
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList" name="user_image" getValueFromEvent={normFile} >
                    <Upload listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
            </Space>

            <Form.Item
                label={'Email'}
                name={'email'}
                rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
            >
                <Input type={'email'} placeholder="abc.xyz@mail.com"/>
            </Form.Item>

            <Form.Item
                label={'Password'}
                name={'password'}
                rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
            >
                <Input placeholder="Enter your password"/>
            </Form.Item>

            <Space direction="horizontal">
                <Form.Item name="role" label="Select Role" rules={[{ required: true }]}>
                    <Select
                        placeholder="Choose the role for this agent"
                        allowClear
                        options={
                            (roles && roles.success) ? roles.data.map((role: Role) => ({
                                value: role.id,
                                label: role.name
                            })) : []
                            }
                    />
                </Form.Item>
            

            <Form.Item
                name="station" label="Select Station"
            >
                <Select
                        placeholder="Choose the Station for this agent"
                        allowClear
                        options={
                            (stations && stations.success) ? stations.data.map((station: Station) => ({
                                value: station.id,
                                label: station.name
                            })) : []
                            }
                    />
            </Form.Item>
            </Space>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isPending}>
                    Submit
                </Button>
                <Button style={{marginLeft: 10}} onClick={() => setModalOpen(false)}>
                    cancel
                </Button>
            </Form.Item>
            

        </Form>
    </>
    )
}

export default FormAddUsers;