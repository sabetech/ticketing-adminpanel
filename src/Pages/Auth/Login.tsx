import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { TAuthUserResponse, TLoginValues } from '../../Types/Auth';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../Services/Auth';
import { signIn } from '../../Utils/Auth';
import { RemoteError, TErrorResponse } from '../../Types/Remote';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {

  const { mutate, isPending } = useMutation(
    {
      mutationFn: (values: TLoginValues): Promise<TAuthUserResponse> => login(values),
      onSuccess: (data: TAuthUserResponse) => {
        console.log("DATA RESPONSE::", data);
        signIn(data)
        console.log("login should be successful here");
        location.reload();
      },
      onError: (error: RemoteError<TErrorResponse>, variables) => {
        console.log("ERROR RESPONSE::",error.response.data.message)
        console.log("Variables::",variables)
      }
    }
  )

  const onFinish = async (values: TLoginValues) => {
    console.log("LOGIN VALUES:::",values)
    mutate(values)
  }

  return (
  <>
    <div style={{width: '100vw'}}>
        <div style={{ marginLeft: '15%' }}>
          <Typography.Title level={3} style={{ marginLeft: '12%', marginBottom: '1%' }}>Login</Typography.Title>
          
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />

            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={isPending}>
                Login!
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div> 
  </>
)
};

export default Login;