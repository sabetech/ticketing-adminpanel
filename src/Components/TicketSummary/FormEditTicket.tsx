import  { Form, Input, Select } from 'antd'
import { Ticket } from '../../Types/Tickets';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

type Props = {
    oldFormFields: Ticket
}

const FormEditTicket:React.FC<Props> = ({oldFormFields}) => {

    const [form] = Form.useForm();
    form.setFieldValue('title', oldFormFields.title)
    form.setFieldValue('car_number', oldFormFields.car_number)
    form.setFieldValue('amount', oldFormFields.amount)
    form.setFieldValue('agent', `${oldFormFields.agent.fname} ${oldFormFields.agent.lname}`)

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
                name="agent"
                rules={[{ required: true, message: 'Please input agent' }]}
            >
                <Select
                    showSearch
                    placeholder="Select an Agent"
                />
            </Form.Item>
            <Form.Item
                label="Date and Time"
                name="issued_date_time"
                rules={[{ required: true, message: 'Please input date and time' }]}
            >
                <DatePicker 
                    showTime
                    defaultPickerValue={dayjs(oldFormFields.issued_date_time)}
                />
            </Form.Item>
        </Form>
    )
}

export default FormEditTicket;