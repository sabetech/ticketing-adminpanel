import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Button, Statistic } from "antd";
import { DatePicker, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import TableTickets from "../../Components/TicketSummary/TableTickets";
import dayjs from "dayjs";
import { getTicketsIssued } from "../../Services/TicketService";
import { RemoteResponse, AppError } from "../../Types/Remote";
import { Ticket } from "../../Types/Tickets";
import { useQuery } from "@tanstack/react-query";

const { RangePicker } = DatePicker;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const TicketsSummary = () => {

    const [dateRange, setDateRange] = useState<[string, string]>([dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")])
    const [tickets, setTickets] = useState<Ticket[]>([]);
    
    const { data: ticketData, isLoading } = useQuery<RemoteResponse<Ticket[]> | AppError>({
      queryKey: ['ticketsIssued', dateRange],
      queryFn: async () => getTicketsIssued(dateRange)
    });

    useEffect(() => {
        if (ticketData?.success) {
            setTickets(ticketData.data)
        }

    },[ticketData]);

    //write an onChange handler for the RangePicker
    const onchange = (_: any, dateRange: [string, string]) => {
        setDateRange(dateRange)
    }

    return (
        <>
            <Row>
                <Col span={23}>
                    <Card title={"Filter Tickets"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left', marginRight: '3rem'}}> 
                                <Typography>Date Filter</Typography>
                                <Space direction="horizontal" >
                                    <RangePicker showTime size={'large'} onChange={onchange} defaultValue={[dayjs().startOf('day'), dayjs()]} />
                                    <Button type="primary" size={'large'} style={{justifySelf:'flex-end'}}>
                                        Go!
                                    </Button>
                                </Space>
                            </Space>

                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Search</Typography>
                                <Search
                                    placeholder="Search by Car Number, Ticket ID, Agent Name"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onSearch={onSearch}
                                    style={{ width: 500 }}
                                />
                            </Space>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{marginTop: '2%', marginBottom: '2%'}}>
                <Col span={4}>
                    <Card bordered={true}>
                        <Statistic title="Total Tickets" value={tickets.length ?? 0} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <Statistic title="Total Paid Amount" value={ tickets.reduce( (acc: number, tkt: Ticket) => { return parseFloat(tkt.amount) + acc}, 0 ) } suffix={"GHc"} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <Statistic title="Unpaid Tickets" value={tickets.filter(tkt =>tkt.paid != true).length}  valueStyle={{ color: '#cf1322' }} />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <Statistic title="Unpaid Ticket Amount" value={ tickets.reduce( (acc: number, tkt: Ticket) => { 
                            if (!tkt.paid) {
                                return acc + parseFloat(tkt.amount);
                            }
                            return acc;
                            }, 0 )  } 
                        suffix={"GHc"} valueStyle={{ color: '#cf1322' }} />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <Statistic title="Agents" value={5} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={23}>
                    <TableTickets ticketData={tickets} isLoading={isLoading}/>
                </Col>
            </Row>
        </>
    );
}

export default TicketsSummary;