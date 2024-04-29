import  { Button, Form, Input, Select, Space, message } from 'antd'
import { Ticket } from '../../Types/Tickets';
import { Rate } from '../../Types/Rate';
import { Agent } from '../../Types/Agent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTicket } from "../../Services/TicketService"

type Props = {
    oldFormFields: Ticket
    rates: Rate[]
    agents: Agent[],
    setModalOpen: any
}

const FormEditTicket:React.FC<Props> = ({oldFormFields, rates, agents, setModalOpen}) => {
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate: editTicketMutate, isPending } = useMutation({
        mutationFn: (_values) => editTicket(oldFormFields.id, _values),
        onSuccess: (data: any) => { 
            setModalOpen(false);
            queryClient.invalidateQueries();
            messageApi.success(data.message);
        }
    });

    const [form] = Form.useForm();
    form.setFieldValue('title', oldFormFields.title)
    form.setFieldValue('car_number', oldFormFields.car_number)
    form.setFieldValue('rate', oldFormFields.rate.title);
    form.setFieldValue('agent', oldFormFields.agent.fname + " " + oldFormFields.agent.lname)

    const onFinish = (_values: any) => {
        console.log("FORM FIElDS::", _values);
        editTicketMutate(_values);
    }

    return (
        <>
        {contextHolder}
        
        <Form
            size={'large'}
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Ticket ID"
                name="title"
                rules={[{ required: true, message: 'Please input your Ticket!' }]}
            >
                <Input disabled/>
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
            <Form.Item>
                <Space style={{float: 'right'}}>
                    
                    <Button  style={{marginRight: 10}} onClick={() => setModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button htmlType='submit' type='primary' loading={isPending}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
        </>
    )
}

export default FormEditTicket;