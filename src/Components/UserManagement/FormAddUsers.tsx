import { Form, Input, Space, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { getRoles } from "../../Services/User";
import { useQuery } from "@tanstack/react-query";
import { Role } from "../../Types/User";
import { RemoteResponse, AppError } from "../../Types/Remote";

const FormAddUsers = () => {
    const [form] = useForm();
    const { data:roles } = useQuery<RemoteResponse<Role[]> | AppError>({
        queryKey: ['roles'],
        queryFn: async () => getRoles()
    });

    return (
    <>
        <Form
            form={form}
            size={'large'}
            layout="vertical"
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

            <Form.Item
                label={'Phone number'}
                name={'phone'}
                style={{width: '50%'}}
                rules={[
                    {
                      required: true,
                      message: 'Please input your Phone Number!',
                    },
                  ]}
            >
                <Input addonBefore={'+233'} style={{ width: '100%' }} placeholder="549999999"/>
            </Form.Item>

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

        </Form>
    </>
    )
}

export default FormAddUsers;