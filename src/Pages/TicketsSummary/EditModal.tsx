import { useEffect, useState } from "react"
import { Form, Modal, Select, Input, DatePicker, message } from "antd"
import { Ticket } from "../../Types/Tickets"
import dayjs from "dayjs"
import { Rate } from "../../Types/Rate"
import { useGetRates } from "../../hooks/RateHooks"
import { Agent } from "../../Types/Agent"
import { useGetAgents } from "../../hooks/AgentHooks"
import { useSubmitEditedTicket } from "../../hooks/Tickethooks"

type EditTicketModalProps = {
    ticket: Ticket,
    isModalOpen: boolean,
    setModalOpen: (isOpen: boolean) => void
}

const EditTicketModal: React.FC<EditTicketModalProps> = ({ticket, isModalOpen, setModalOpen }) => {
    if (!ticket) return <></>
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedRate, setSelectedRate] = useState<Rate | null>(ticket.rate);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(ticket.agent);
    const {mutate: submit, isPending} = useSubmitEditedTicket(ticket.id, {
        onSuccess: (data) => {
            messageApi.success(data.message)
            setModalOpen(false)
        },
        onError: (error) => {
            messageApi.error("Error: " + error)
        }
    })
    const handleOk = () => {
        console.log("Editing ticket::", form.getFieldsValue())
        submit(form.getFieldsValue())
    }

    const handleCancel = () => {
        setModalOpen(false)
    }

    const { data: rates } = useGetRates();
    const { data: agents } = useGetAgents();

    useEffect(() => {

        if (ticket) {
            form.setFieldValue('title', ticket.title)
            form.setFieldValue('car_number', ticket.car_number)
            form.setFieldValue('amount', ticket.amount);
            form.setFieldValue('issued_date_time', dayjs(ticket.issued_date_time));
        }

        if (rates) {
            const selectedRateDefault = rates.find((rate: Rate) => rate.id === ticket.rate.id);
            setSelectedRate(selectedRateDefault);
        }

        if (agents) {
            const selectedAgentDefault = agents.find((agent: Agent) => agent.id === ticket.agent.id);
            setSelectedAgent(selectedAgentDefault);
        }
       
    }, [ticket])

    useEffect(() => {
        if (selectedRate) {
            form.setFieldValue('rate', selectedRate?.title);
            form.setFieldValue('rate_id', selectedRate?.id);
            form.setFieldValue('amount', selectedRate?.amount);
        }

        if (selectedAgent) {
            form.setFieldValue('agent_id', selectedAgent?.id);
            form.setFieldValue('agent', selectedAgent?.fname + " " + selectedAgent?.lname);
        }

    }, [selectedRate, selectedAgent])

    return (<>
        {contextHolder}
        {ticket &&
        <Modal title={`Edit Ticket ${ticket.title}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            okText="Save"
            confirmLoading={isPending}
        >
            <Form
                layout="vertical"
                name="edit-ticket"
                form={form}
                initialValues={{ remember: true }}
                autoComplete="off"
                style={{width: '100%'}}
                onFinish={handleOk}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input your title!' }]}>
                    <Input size="large" disabled/>
                </Form.Item>
                <Form.Item label="Issued Date and Time" name="issued_date_time" rules={[{ required: true, message: 'Please input your issued date!' }]}>
                    <DatePicker size="large" renderExtraFooter={() => 'Select the correct date and time and Hit Ok!'} showTime />
                </Form.Item>
                <Form.Item label="Car Number" name="car_number" rules={[{ required: true, message: 'Please input your car number!' }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    name="rate_id"
                    noStyle
                    hidden={true} />
                <Form.Item
                    label="Rate Category"
                    name="rate"
                    rules={[{ required: true, message: 'Please select Rate' }]}
                >
                <Select
                    size='large'
                    placeholder="Select Rate"
                    showSearch
                    options={rates && rates.map((rate: Rate) => {
                        if (typeof rate.station ==='object') return ({
                        value: rate?.id + "",
                        label: `${rate.title} (${rate.station.name})`
                        })
                        return {
                            value: rate?.id + "",
                            label: `${rate.title}`
                        }
                    }
                    ) || []}
                    filterOption={(input: string, option?: { label: string; value: string }) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onSelect={(value: string) => {
                        form.setFieldValue('amount', rates.find((rate: Rate) => rate.id === parseInt(value))?.amount)
                        setSelectedRate(rates.find((rate: Rate) => rate.id === parseInt(value)))
                    }}
                />
            </Form.Item>

            <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: 'Please input the amount!' }]}
            >
                <Input size="large" disabled={ selectedRate.rate_type !== 'flexible' } />
            </Form.Item>

            <Form.Item
                name="agent_id"
                noStyle
                hidden={true} 
            />

            <Form.Item
                label="Agent"
                name="agent"
                rules={[{ required: true, message: 'Please input agent' }]}
            >
                <Select
                    size="large"
                    showSearch
                    placeholder="Select an Agent"
                    options={agents && agents.map((agent: Agent) => ({
                            value: agent.id.toString(),
                            label: agent.fname + " " + agent.lname
                            })
                    ) || []}
                    filterOption={(input: string, option?: { label: string; value: string }) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onSelect={(value: string) => {
                        setSelectedAgent(  agents.find((agent: Agent) => agent.id === parseInt(value)))
                    }}
                />
            </Form.Item>
            </Form>
        </Modal>
        ||
        <></>
        }
    </>)
}

export default EditTicketModal