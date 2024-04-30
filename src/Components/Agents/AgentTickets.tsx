import { useState } from "react";
import { Table, TableProps, Space, Button, Modal, message } from "antd";
import { Ticket } from "../../Types/Tickets";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { deleteTicket } from "../../Services/TicketService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AgentTicketsProp = {
    agentTickets: Ticket[] | undefined
}

const AgentTickets = ({agentTickets}:AgentTicketsProp) => {

    const [idToDelete, setIDToDelete] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const { mutate: deleteTicketMutation, isPending } = useMutation({
        mutationFn: (id: number) => deleteTicket(id),
        onSuccess: (data: any) => { 
            queryClient.invalidateQueries();
            messageApi.success(data.message);
        }
    });

    const handleDeleteConfirm = (ticketId: number) => {
        setIDToDelete(ticketId)
        deleteTicketMutation(ticketId)
    }

    const handleTicketEdit = (rec: Ticket) => {
        console.log(rec)
    }

    const columns: TableProps<Ticket>['columns'] = [
        {
            title: 'Ticket ID',
            dataIndex: 'title',
            key: 'ticket_id',
        },
        {
            title: 'Ticket Type',
            dataIndex: 'rate',
            key: 'ticket_type',
            render: (value) => value.title
        },
        {
            title: 'Car Number or Subject',
            dataIndex: 'car_number',
            key: 'car_number',
        },
        {
            title: 'Ticket Cost',
            dataIndex: 'amount',
            key: 'ticket_cost',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (_, record: Ticket) => <Space size="middle">
                <Button icon={<EditFilled />} onClick={() => handleTicketEdit(record)}>Edit</Button>
            
                    <Button type="primary" danger icon={<DeleteFilled />} 
                        onClick={() => {
                            Modal.warning({
                                title: 'Delete Ticket?',
                                content: `Are you sure you want to delete this Ticket?`,
                            okText: 'Yes',
                            cancelText: 'No',
                            onOk: () => handleDeleteConfirm(record.id),
                            onCancel: () => console.log("Canceled"),
                            closable: true,
                        });
                        }}
                        loading={(idToDelete === record.id) && isPending }
                    />
            
            </Space>
        }
    ]


    return (
        <>
            {contextHolder}
            <Table 
                style={{width: '60vw'}}
                columns={columns}
                dataSource={agentTickets}
                // scroll={{y: 500}}
                sticky={{ offsetHeader: 200 }}
            />
        </>
    )
}

export default AgentTickets;