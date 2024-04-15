import  { Form, Input } from 'antd'
import { Ticket } from '../../Types/Tickets';

type Props = {
    oldFormFields: Ticket
}

const FormEditTicket:React.FC<Props> = ({oldFormFields}) => {

    const [form] = Form.useForm();
    form.setFieldsValue(oldFormFields)
    console.log("DOFMR::",oldFormFields)

    return (
        <Form
            size={'large'}
            form={form}
        >
            <Form.Item
                label="Ticket ID"
                name="title"
                rules={[{ required: true, message: 'Please input your Ticket!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Car Number or phone"
                name="car_number"
                rules={[{ required: true, message: 'Please input the Car Number!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: 'Please input the amount!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Agent"
                name="fname"
                rules={[{ required: true, message: 'Please input agent' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Date and Time"
                name="issued_date_time"
                rules={[{ required: true, message: 'Please input date and time' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default FormEditTicket;