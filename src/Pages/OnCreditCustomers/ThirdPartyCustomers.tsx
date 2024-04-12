import { Row, Col, Card, Space, Typography, DatePicker, Input, Statistic, Button } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import PendingTickets from '../../Components/ThirdParty/PendingTickets';
import { useQuery } from '@tanstack/react-query';
import { Ticket } from '../../Types/Tickets';
import { RemoteResponse, AppError } from '../../Types/Remote';
import { useEffect, useState } from 'react';
import { getThirdPartyTickets } from '../../Services/TicketService';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const stationSelect = 'stationSelect';

const { RangePicker } = DatePicker;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const ThirdPartyCustomers = () => {

    const [dateRange, setDateRange] = useState<{from:string, to:string} | undefined>({ from: dayjs().add(-1, 'd').format("YYYY-MM-DD HH:mm:ss"), to: dayjs().format("YYYY-MM-DD HH:mm:ss") });
    const [thirdPartyTickets, setThirdPartyTicket] = useState<Ticket[]>([]);

    const { data:thirdPartyTicketsData, isLoading, isSuccess } = useQuery<RemoteResponse<Ticket[]> | AppError>({
        queryKey: ['thirdpartyticket'],
        queryFn: async () => getThirdPartyTickets(dateRange?.from, dateRange?.to)
    });

    useEffect(() => {

        if (isSuccess && thirdPartyTicketsData.success) {
            setThirdPartyTicket(thirdPartyTicketsData.data);
        }

    }, []);

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setDateRange({from: dateStrings[0], to: dateStrings[1]});
        } else {
            console.log('Clear');
        }
    };

    return (
    <>
        <Row>
            <Col span={23}>
                <Card title={"Filter Options"} style={{textAlign: 'left'}}>
                    <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                        <Space direction="vertical" style={{textAlign: 'left', marginRight: '3rem'}}> 
                            <Typography>Date Filter</Typography>
                            <Space direction="horizontal" >
                                <RangePicker 
                                    onChange={onRangeChange}
                                    showTime 
                                    size={'large'}
                                    defaultValue={[dayjs().startOf('day'), dayjs()]}
                                />
                                
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
                    <Row gutter={16} style={{marginTop: '2%'}}>
                        <Col span={4}>
                            <Statistic title="Pending Payments" value={thirdPartyTickets.length} />
                        </Col>
                        <Col span={4}>
                            <Statistic title="Pending Amount GHC" 
                                        value={thirdPartyTickets.reduce((acc, tkt) => acc + parseFloat(tkt.amount) ,0) } 
                                        precision={2} />
                            <Button style={{ marginTop: 16 }} type="primary">
                                Make Payment
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col span={23}>
                <PendingTickets />
            </Col>
        </Row>
    </>
    );
}

export default ThirdPartyCustomers;