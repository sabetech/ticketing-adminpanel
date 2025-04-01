import  { Button, Form, Input, Select, Space, message, InputNumber} from 'antd'
import { Ticket } from '../../Types/Tickets';
import { Rate } from '../../Types/Rate';
import { Agent } from '../../Types/Agent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTicket } from "../../Services/TicketService"
import { useEffect } from 'react';
import { DatePicker } from "antd";
import dayjs from 'dayjs';

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
        mutationFn: (_values) => {
            const optimisticTicketUpdate = { id: oldFormFields.id, _values }

    // Add optimistic todo to todos list
    queryClient.setQueryData(['todos'], (old) => [...old, optimisticTodo])
            return editTicket(oldFormFields.id, _values)
        },
        onSuccess: (data: any,_, context) => { 
            console.log("RESULT::", data)
            console.log("old form fields::", oldFormFields)
            setModalOpen(false);
           
            queryClient.setQueryData(['ticketsIssued', oldFormFields.id], (oldData: any) => {
                console.log("Old data::", oldData)
                if (!oldData) return;
                
                console.log("Old data::", oldData)
                console.log("data data::", data.data)
                return {
                    ...oldData,
                    ...data.data, // Merge updated ticket data into cached data
                };
            });
            messageApi.success(data.message);
        }
    });

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldValue('title', oldFormFields.title)
        form.setFieldValue('car_number', oldFormFields.car_number)
        form.setFieldValue('rate', oldFormFields.rate.title);
        form.setFieldValue('amount', oldFormFields.amount);
        form.setFieldValue('agent', oldFormFields.agent.fname + " " + oldFormFields.agent.lname);
        form.setFieldValue('issued_date_time', dayjs(oldFormFields.issued_date_time));
    }, [])

    // form.setFieldValue('agent', oldFormFields.agent.fname + " " + oldFormFields.agent.lname)

    const onFinish = (_values: any) => {
        _values = {..._values, rate_id: oldFormFields.rate.id, issued_date_time: dayjs(_values.issue_date_time).format('YYYY-MM-DD HH:mm:ss')}
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
                label="Date"
                name="issued_date_time"
            >
                <DatePicker 
                    renderExtraFooter={() => 'Select Date and Time'} showTime 
                    // defaultPickerValue={ dayjs(oldFormFields.issued_date_time) } 
                    defaultValue={ dayjs(oldFormFields.issued_date_time) }
                    value={ dayjs(oldFormFields.issued_date_time) }
                    format="YYYY-MM-DD HH:mm:ss"
                    
                />
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

            {
                oldFormFields.rate.rate_type === "flexible" &&
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input amount' }]}
                >
                    <InputNumber addonAfter={"GHs"} />
                </Form.Item>
            }

            <Form.Item
                label="Agent"
                name="agent"
                rules={[{ required: true, message: 'Please input agent' }]}
            >
                <Select
                    showSearch
                    placeholder="Select an Agent"
                    options={agents.map((agent: Agent) => ({
                            value: agent.id.toString(),
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