import  { Form, Input, Select } from 'antd'
import { Ticket } from '../../Types/Tickets';
import { Rate } from '../../Types/Rate';
import { Agent } from '../../Types/Agent';

type Props = {
    oldFormFields: Ticket
    rates: Rate[]
    agents: Agent[]
}

const FormEditTicket:React.FC<Props> = ({oldFormFields, rates, agents}) => {

    const [form] = Form.useForm();
    form.setFieldValue('title', oldFormFields.title)
    form.setFieldValue('car_number', oldFormFields.car_number)
    form.setFieldValue('rate', oldFormFields.rate.title)
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
                label="Rate Category"
                name="rate"
                rules={[{ required: true, message: 'Please select Rate' }]}
            >
                <Select
                    showSearch
                    options={rates.map((rate: Rate) => {
                        if (typeof rate.station ==='object') return ({
                        value: rate?.id + "",
                        label: `${rate.title} (${rate.station.name})`
                        })
                        return {
                            value: rate?.id + "",
                            label: `${rate.title}`
                        }
                    }
                    )}
                    filterOption={(input: string, option?: { label: string; value: string }) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />
            </Form.Item>
            <Form.Item
                label="Agent"
                name="agent"
                rules={[{ required: true, message: 'Please input agent' }]}
            >
                <Select
                    showSearch
                    placeholder="Select an Agent"
                    options={agents.map((agent: Agent) => ({
                            value: agent.id+"",
                            label: agent.fname + " " + agent.lname
                            })
                    )}
                    filterOption={(input: string, option?: { label: string; value: string }) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />
            </Form.Item>
        </Form>
    )
}

export default FormEditTicket;