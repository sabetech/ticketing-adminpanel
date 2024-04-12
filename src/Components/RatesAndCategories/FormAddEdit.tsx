import { Select, Form, Input, InputNumber, Space, Checkbox } from 'antd';

type formProps = {
    initialValues: any
}

const FormAddEdit = ({initialValues}: formProps) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    form.setFieldsValue(initialValues)

    return (
        <Form size='large' layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
            <Form.Item
                name="category"
                label="Rate Category"
                rules={[{ required: true, message: 'Please input category!' }]}
            >
                <Input />
            </Form.Item>
            <Space direction={"horizontal"}>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please input Amount!' }]}
                >
                    <InputNumber prefix="GHc" style={{ width: '90%' }} />
                </Form.Item>
                <Form.Item label="Fixed Or Flexible" name="flexible" valuePropName="checked">
                    <Checkbox>Flexible</Checkbox>
                </Form.Item>
            </Space>
            <Form.Item name="postpaid" valuePropName="checked">
                    <Checkbox>Postpaid Rate</Checkbox>
                </Form.Item>
            <Form.Item
                name="station"
                label="Station"
                rules={[{ required: true, message: 'Please select gender!' }]}
            >
                <Select placeholder="Select Station">
                    <Option value="circle">Circle </Option>
                    <Option value="achimota">Achimota</Option>
                </Select>
            </Form.Item>
        </Form>
    );
}

export default FormAddEdit;