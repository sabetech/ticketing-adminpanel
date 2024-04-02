import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Statistic, AutoComplete, message } from "antd";
import { DatePicker, Input } from 'antd';
import TableTickets from "../../Components/TicketSummary/TableTickets";
import dayjs from "dayjs";
import { getTicketsIssued } from "../../Services/TicketService";
import { RemoteResponse, AppError } from "../../Types/Remote";
import { Ticket } from "../../Types/Tickets";
import { useQuery } from "@tanstack/react-query";

const { RangePicker } = DatePicker;

const TicketsSummary = () => {

    const [dateRange, setDateRange] = useState<[string, string]>([dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")])
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [autocompletOptions, setAutocompleteOptions] = useState<{
        key: string,
        label: JSX.Element, 
        value: string
    }[]>();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: ticketData, isLoading, isError, error } = useQuery<RemoteResponse<Ticket[]> | AppError>({
      queryKey: ['ticketsIssued', dateRange],
      queryFn: async () => getTicketsIssued(dateRange)
    });

    if (isError) {
        
        messageApi.open({
            type: 'error',
            content: error.message,
          });
          
    }

    useEffect(() => {
        if (ticketData?.success) {
            setTickets(ticketData.data)
            if (typeof ticketData.data !== 'undefined')
                setAutocompleteOptions(constructAutoCompleteOptions(ticketData.data))
        }

    },[ticketData]);

    //write an onChange handler for the RangePicker
    const onchange = (_: any, dateRange: [string, string]) => {
        setDateRange(dateRange)
    }

    const onSearchChange = (text:string) => {
        if (text === "") {
            if (ticketData?.success) {
                setTickets(ticketData.data)
                if (typeof ticketData.data !== 'undefined')
                    setAutocompleteOptions(constructAutoCompleteOptions(ticketData.data))
            }
        }
    }

    const onsearchselect = (text: string) => {
        
        const searchedTickets = tickets.filter(tkt => 
                `${tkt.agent.fname} ${tkt.agent.lname}` === text
                || tkt.car_number === text 
                || tkt.title === text
                || tkt.name === text
            );
        
        setTickets(searchedTickets);
    }

    const onSearchClear = () => {
        if (ticketData?.success) {
            setTickets(ticketData.data)
            if (typeof ticketData.data !== 'undefined')
                setAutocompleteOptions(constructAutoCompleteOptions(ticketData.data))
        }
    }
      
    const renderItem = (title: string): JSX.Element => 
    (
        <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}
        >
        {title}
        </div>
    );

    const constructAutoCompleteOptions = ( ticketsData: Ticket[] ) => {
        
        if(!ticketsData){ return [] };

        const options: {
            key: string,
            label: JSX.Element, 
            value: string
        }[] = [];

        for(let i = 0; i < ticketsData.length; i++) {
            
            if (!options.some(x => x.value === ticketsData[i].name))
                options.push({
                    key: i+ticketsData[i].name,
                    label: renderItem(ticketsData[i].name),
                    value: ticketsData[i].name
                    });

            if (!options.some(x => x.value === ticketsData[i].car_number))
                options.push({
                    key: i+ticketsData[i].car_number,
                    label: renderItem(ticketsData[i].car_number),
                    value: ticketsData[i].car_number
                    });
           
            if (!options.some(x => x.value === `${ticketsData[i].agent.fname} ${ticketsData[i].agent.lname}`))
                options.push({
                    key: i+`${ticketsData[i].agent.fname} ${ticketsData[i].agent.lname}`,
                    label: renderItem(`${ticketsData[i].agent.fname} ${ticketsData[i].agent.lname}`),
                    value: `${ticketsData[i].agent.fname} ${ticketsData[i].agent.lname}`
                    });
            
            options.push({
                key: i+ticketsData[i].title,
                label: renderItem(ticketsData[i].title),
                value: ticketsData[i].title
                });

        }
        return options;
    }   

    return (
        <>
        {contextHolder}
            <Row>
                <Col span={23}>
                    <Card title={"Filter Tickets"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left', marginRight: '3rem'}}> 
                                <Typography>Date Filter</Typography>
                                <Space direction="horizontal" >
                                    <RangePicker showTime size={'large'} onChange={onchange} defaultValue={[dayjs().startOf('day'), dayjs()]} />
                                </Space>
                            </Space>

                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Search</Typography>
                                <AutoComplete 
                                    allowClear
                                    onClear={onSearchClear}
                                    onChange={onSearchChange}
                                    options={autocompletOptions}
                                    style={{ width: 500 }}
                                    size="large"
                                    filterOption={(inputValue, option) => 
                                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    placeholder="Search by Car Number, Ticket ID, Agent Name, Station" 
                                    onSelect={(text: string, option: any) => onsearchselect(text)}
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