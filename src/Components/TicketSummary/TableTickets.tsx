import { useState } from "react";
import {Button, message, Table, Typography, Modal, Tag } from "antd";
import type { TableProps } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Ticket } from "../../Types/Tickets";
import { Rate } from "../../Types/Rate";
import FormEditTicket from "./FormEditTicket"
import { Agent } from "../../Types/Agent";
import * as utils from "../../Utils/Helpers"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTicket, deleteTickets } from "../../Services/TicketService";
import { getRates } from "../../Services/Rate";
import  { getAgentList } from "../../Services/AgentService"

type TableTicketProp = {
    ticketData: Ticket[],
    isLoading: boolean
}

const TableTickets: React.FC<TableTicketProp> = ( {ticketData, isLoading} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editTicketInfo, setEditTicketInfo] = useState<Ticket>();
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const [idToDelete, setIDToDelete] = useState(0);

    const onSelectChange = (newSelectedRowKeys: number[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const { mutate: deleteTicketMutation, isPending } = useMutation({
        mutationFn: (id: number) => deleteTicket(id),
        onSuccess: (data: any) => { 
            queryClient.invalidateQueries();
            messageApi.success(data.message);
        }
    });

    const { mutate: deleteBulkTicketMutation, isPending:isBulkPending } = useMutation({
        mutationFn: (ids: number[]) => deleteTickets(ids),
        onSuccess: (data: any) => { 
            queryClient.invalidateQueries();
            messageApi.success(data.message);
        }
    })

    const { data: rates } = useQuery({
        queryKey: ['rates'],
        queryFn: () => getRates(),
    });

    const { data: agents } = useQuery({
        queryKey: ['agents'],
        queryFn: () => getAgentList(),
    });
    

    const columns: TableProps<Ticket>['columns'] = [
        {
            title: 'Ticket No',
            dataIndex: 'title',
            key: 'key'
        },
        {
            title: 'Car Number',
            dataIndex: 'car_number',
            key: 'car_number',
            render: (val: string) => val.toUpperCase()
        },
        {
            title: 'Station',
            dataIndex: 'name',
            key: 'station'
        },
        {
            title: 'Category',
            dataIndex: 'rate',
            key: 'category',
            filters: [
                {
                  text: 'Fixed',
                  value: 'fixed',
                },
                {
                    text: 'Flexible',
                    value: 'flexible',
                },
                {
                    text: 'Postpaid',
                    value: 'postpaid',
                },
            ],
            onFilter: (value, record) => {
                console.log("FILTER BUGY",value, record.rate.rate_type)
                return record.rate.rate_type === value
            },
            render: (rate: Rate) => <>{rate.title} <Tag>{rate.rate_type.toUpperCase()}</Tag> {(rate.is_postpaid == true) && (<Tag color="gold" >Postpaid</Tag>)} </>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Agent',
            dataIndex: 'agent', 
            key: 'agent',
            sorter: true,
            render: (agent: Agent) => agent.fname
        },
        {
            title: 'Date & time',
            dataIndex: 'issued_date_time',
            key: 'date_time',
            sorter: true,
            render: (dateTime: string) => utils.formatDateTime(dateTime)
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (_, record: Ticket) => <>
            <Button icon={<EditFilled />} onClick={() => {
                setModalOpen(true)
                setEditTicketInfo(record)
                }
            } >Edit</Button>
            
            <Button type="text" danger icon={<DeleteFilled />} onClick={() => handleDeleteClick(record)} loading={(idToDelete === record.id) && isPending }/>
                
            </>
        }
    ]

    const handleDeleteClick = (record: Ticket) => {
        Modal.warning({
                title: 'Delete Ticket?',
                content: `Are you sure you want to delete this Ticket?`,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => handleDeleteConfirm(record.id),
            onCancel: () => console.log("Canceled"),
            closable: true,
        });
    }

    const handleDeleteConfirm = (ticketId: number) => {
        console.log("TICKET ID IS HERE::", ticketId)
        setIDToDelete(ticketId)
        deleteTicketMutation(ticketId)
    }

    const handleOk = () => {
        console.log("DELETE THESE IDS::", selectedRowKeys);
        deleteBulkTicketMutation(selectedRowKeys)
    };

    const handleCancel = () => {
        setModalOpen(false);
    }
    

    const onDeleteMultiple = () => {
        Modal.confirm({
            title: 'Confirm Delete?',
            onOk: handleOk,
            content: 'Are you sure you want to delete the Tickets selected?',
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            ),
    })}

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
        {contextHolder}
            <Modal 
                title="Edit Ticket" open={isModalOpen}  onCancel={handleCancel}
                footer={null}
                >
               {editTicketInfo && <FormEditTicket oldFormFields={editTicketInfo} rates={ rates?.success ? rates.data : []} agents={agents?.success ? agents.data : []} setModalOpen={setModalOpen}/>}
            </Modal>
            <span style={{ float: 'left' }}>
                {hasSelected ? <>
                    <Typography.Title level={5}>Selected {selectedRowKeys.length} items: <Button danger onClick={onDeleteMultiple} disabled={isBulkPending} loading={isBulkPending}>Delete?</Button> </Typography.Title></> : ''}
                
            </span>
            <Table 
                rowSelection={rowSelection}
                columns={columns}  
                dataSource={ticketData} 
                loading={isLoading}
                pagination={{
                    defaultPageSize: 100, 
                    pageSizeOptions: ['100', '200', '300'] }}
            />
        </>
    )
}

export default  TableTickets;