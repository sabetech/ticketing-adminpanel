import { useState } from "react";
import {Button, Popconfirm, Table, Typography, Modal, Tag } from "antd";
import type { TableProps } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Ticket } from "../../Types/Tickets";
import { Rate } from "../../Types/Rate";
import FormEditTicket from "./FormEditTicket"
import { Agent } from "../../Types/Agent";
import * as utils from "../../Utils/Helpers"

type TableTicketProp = {
    ticketData: Ticket[],
    isLoading: boolean
}

const TableTickets: React.FC<TableTicketProp> = ( {ticketData, isLoading} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editTicketInfo, setEditTicketInfo] = useState<Ticket>();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    

    const columns: TableProps<Ticket>['columns'] = [
        {
            title: 'Ticket No',
            dataIndex: 'title',
            key: 'key'
        },
        {
            title: 'Car Number',
            dataIndex: 'car_number',
            key: 'car_number'
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
            render: (rate: Rate) => <>{rate.title} <Tag>{rate.rate_type.toUpperCase()}</Tag></>
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
                <Popconfirm
                    title="Delete the Ticket"
                    description="Are you sure to delete this Ticket?"
                    onConfirm={ () => handleDeleteConfirm(record.id) }
                    onCancel={() =>{}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="text" danger icon={<DeleteFilled />} onClick={handleDeleteClick}/>
                </Popconfirm>
            </>
        }
    ]

    const handleDeleteClick = () => {
        
    }

    const handleDeleteConfirm = (ticketId: number) => {
        console.log("TICKET ID IS HERE::", ticketId)
    }

    const handleOk = () => {
        console.log("DELETE THESE IDS::", selectedRowKeys);
      };

    // const handleEditTicket = (id: number) => {
    //     console.log("EDIT TICKET")
    // }

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
            <Modal title="Edit Ticket" open={isModalOpen}  onCancel={handleCancel}>
               {editTicketInfo && <FormEditTicket oldFormFields={editTicketInfo}  />}
            </Modal>
            <span style={{ float: 'left' }}>
                {hasSelected ? <>
                    <Typography.Title level={5}>Selected {selectedRowKeys.length} items: <Button danger onClick={onDeleteMultiple}>Delete?</Button> </Typography.Title></> : ''}
                
            </span>
            <Table 
                rowSelection={rowSelection}
                columns={columns}  
                dataSource={ticketData} 
                loading={isLoading}
            />
        </>
    )
}

export default  TableTickets;