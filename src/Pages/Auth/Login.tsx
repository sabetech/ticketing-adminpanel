import React from 'react';
import { Button, Form, Input, Typography, Image, Space } from 'antd';
import { TAuthUserResponse, TLoginValues } from '../../Types/Auth';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../Services/Auth';
import { signIn } from '../../Utils/Auth';
import { RemoteError, TErrorResponse } from '../../Types/Remote';
import koajayImage from '../../assets/koajay_logo_new.jpeg';
import './Login.css';

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
        
        signIn(data)
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
  
    <div className='background'>
        
        <Space direction="vertical" style={{width: '100%', justifyContent: 'center', alignItems: 'center', border: '1px solid #d9d9d9', boxShadow: '0 0 5px rgb(0, 0, 0)', padding: '2%', backgroundColor: 'white'}}>
          <Image
            width={200}
            src={koajayImage}
            style={{
              justifySelf: 'center'
            }}
          />

           <Typography.Title level={3} style={{ marginLeft: '12%', marginBottom: '1%', width: 100 }}>Login</Typography.Title>
          <Form
            name="basic"
            style={{ width: 400 }}
            labelCol={{ span: 5 }}
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

            <Form.Item style={{float: 'right'}}>
              <Button type="primary" htmlType="submit" loading={isPending}>
                Login!
              </Button>
            </Form.Item>
          </Form>
        </Space>
    </div> 
  </>
)
};

export default Login;