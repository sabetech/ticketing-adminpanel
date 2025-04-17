import { useEffect, useState } from 'react';
import { Button, Table, type TableProps, Tag, Space, Modal } from 'antd';
import { useGetTickets } from '../../hooks/Tickethooks';
import type { TFilterType, Ticket } from '../../Types/Tickets';
import { Rate } from '../../Types/Rate';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import EditTicketModal from './EditModal';
import { Link } from "react-router-dom";

interface RecordType {

}

type TableTicketsProps = {
    filter: TFilterType
}


const TableTickets:React.FC<TableTicketsProps> = ({ filter }) => {

    const [ticketData, setTicketData] = useState<Ticket[]>([]);
    const [currentPage, setPage] = useState(1);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editTicket, setEditTicket] = useState<Ticket>(null);

    const [trackInternalPage, setTrackInternalPage] = useState(1);

    const {data: tickets, isSuccess, isLoading, isFetching, refetch} = useGetTickets({page: currentPage, ...filter});

    console.log("Current page", currentPage)

    if (isSuccess) {
        console.log("Request is successfull")
        console.log("Tickets here:::", tickets)
        console.log("remote Current Page:::", tickets.current_page)
        console.log("local Current Page:::", currentPage)
        console.log("Internal Page:::", trackInternalPage)

    }

    useEffect(() => {

        if (!tickets) return;
        if (currentPage > tickets.current_page) {
            refetch();   
        }

    },[currentPage, filter])



    useEffect(() => {

        if (tickets && isSuccess) {
            if (trackInternalPage < tickets.current_page) {
                setTicketData((prev) => [...prev, ...tickets.data]);
                setTrackInternalPage(tickets.current_page);
            }else{
                if (tickets.current_page === 1) {
                    setTicketData(tickets.data);
                }
            }
        }
    },[tickets, isSuccess])

    console.log("Filter Here:::", filter)
    console.log("Tickets data::", ticketData)

    const columns: TableProps<RecordType>['columns'] = [
        {
          title: 'Ticket ID',
          dataIndex: 'title',
          width: 60,
        },
        {
            title: 'Date',
            dataIndex: 'issued_date_time',
            width: 100,
            render: (val:string) => dayjs(val).format("DD MMM YYYY h:mm A")
        },
        {
          title: 'Car Number',
          dataIndex: 'car_number',
          width: 60,
        },
        {
          title: 'Station',
          dataIndex: 'station',
          width: 80,
          render: (_: string, rec: Ticket) => rec.station.name
        },
        {
        title: 'Rate',
        dataIndex: 'rate',
        width: 80,
        render: (rate: Rate) => <>{rate.title} <Tag>{rate.rate_type.toUpperCase()}</Tag> {(rate.is_postpaid == true) && (<Tag color="gold" >Postpaid</Tag>)} </>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: 80,
            render: (value, row: Ticket) => {
                return (<>{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GHS' }).format(value) } <Tag color={row.paid ? 'success' : 'warning'}>{row.paid ? 'Paid' :'Unpaid'}</Tag></>)
            }
        },
        {
            title: 'Agent',
            dataIndex: 'agent',
            width: 80,
        render: (_: string, rec: Ticket) => <Link to={`/agent-summary/${rec.agent_name}/detail?date=${dayjs(rec.issued_date_time, "YYYY-MM-DD")}`}>{rec.agent.fname +" "+rec.agent.lname}</Link>
        },
        {
            title: 'Action',
            dataIndex: '',
            width: 80,
            render: (_: string, tkt: Ticket) => {
                return (<Space direction='horizontal' >
                    <Button icon={<EditOutlined />}  size={'large'} onClick={() => handleEditTicket(tkt)}></Button>
                    <Button icon={<DeleteOutlined />} size={'large'} type='primary' 
                        onClick={() => handleDeleteClick(tkt)}
                    ></Button>
                </Space>)
            }
        }
      ];

    const handleEditTicket = (ticket: Ticket) => {
        console.log("Ticket to edit::", ticket)
        setEditTicket(ticket);
        setModalOpen(true);   
    }

    const handleDeleteClick = (record: Ticket) => {
        Modal.warning({
                title: 'Delete Ticket?',
                content: `Are you sure you want to delete this Ticket: ${record.title}?`,
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => handleDeleteConfirm(record.id),
                onCancel: () => console.log("Canceled"),
                closable: true,
        });
    }

    const handleDeleteConfirm = (id: number) => {
        console.log("TICKET ID IS HERE::", id)
        // setIDToDelete(id)
        // deleteTicketMutation(id)
    }

    const handleOnTableScroll = (e) => {
        
        if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 400) {
            
            if (isFetching) return;
            if (tickets.current_page === tickets.last_page) return;

            setPage((prev) => prev + 1);
            
        }
    }

    return (<>
        <Table 
            virtual={true}
            columns={columns} 
            dataSource={ticketData}
            rowKey="id"
            rowSelection={{type: 'checkbox', columnWidth: 30}}
            pagination={false}
            scroll={{y: 600 }}
            loading={isLoading}
            onScroll={handleOnTableScroll}
        />
        <EditTicketModal isModalOpen={isModalOpen} ticket={editTicket} setModalOpen={setModalOpen} />
    </>)
}

export default TableTickets;