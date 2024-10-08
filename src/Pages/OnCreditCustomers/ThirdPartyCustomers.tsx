import { Row, Col, Card, Space, Typography, DatePicker, Input, Statistic, Button } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import PendingTickets from '../../Components/ThirdParty/PendingTickets';
import { useQuery } from '@tanstack/react-query';
import { Ticket } from '../../Types/Tickets';
import { RemoteResponse, AppError } from '../../Types/Remote';
import { useEffect, useState } from 'react';
import { getThirdPartyTickets } from '../../Services/TicketService';
import ModalMakePayment from '../../Components/ThirdParty/ModalMakePayment'
import dayjs from 'dayjs';
import type { TimeRangePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const ThirdPartyCustomers = () => {

    const [dateRange, setDateRange] = useState<{from:string, to:string} | undefined>({ from: dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), to: dayjs().format("YYYY-MM-DD HH:mm:ss") });
    const [thirdPartyTickets, setThirdPartyTicket] = useState<Ticket[]>([]);
    const [openPaymentModal, setPaymentModalOpen] = useState(false);

    const { data:thirdPartyTicketsData, isLoading,  isSuccess, isFetching } = useQuery<RemoteResponse<Ticket[]> | AppError>({
        queryKey: ['thirdpartyticket', dateRange],
        queryFn: async () => getThirdPartyTickets(dateRange?.from, dateRange?.to)
    });

    useEffect(() => {

        if (isSuccess && thirdPartyTicketsData.success) {
            setThirdPartyTicket(thirdPartyTicketsData.data); 
        } 

    }, [thirdPartyTicketsData, dateRange]);

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
      ];

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setDateRange({from: dateStrings[0], to: dateStrings[1]});
        } else {
            console.log('Clear');
        }
    };

    const showPaymentModal = () => {
        setPaymentModalOpen(true);
    }

    // console.log("DATE RANGE VAL::", dateRange)

    return (
    <>
        <ModalMakePayment open={openPaymentModal} dateRange={dateRange} setModalOpen={setPaymentModalOpen}/>
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
                                    presets={rangePresets}
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
                        <Col span={6}>
                            <Card bordered={false}>
                                <Statistic title="Paid" value={ thirdPartyTickets.reduce((acc, tkt) => {
                                    if (tkt.paid == true) acc +=  parseFloat(tkt.amount)
                                    return acc
                            } ,0) }
                                    precision={2}
                                    suffix={'GHc'}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                            </Col>
                        <Col span={4}>
                            <Card bordered={false}>
                                <Statistic title="Paid Tickets" value={thirdPartyTickets.reduce((acc, tkt) => {
                                    if (tkt.paid == true) acc += 1 
                                    return acc}, 0)
                                } />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card bordered={false}>
                                <Statistic title="Pending Amount GHC" 
                                            value={thirdPartyTickets.reduce((acc, tkt) => {
                                                if (tkt.paid == false) acc += parseFloat(tkt.amount)
                                                return acc
                                            } ,0) } 
                                            precision={2} />
                                <Button style={{ marginTop: 16 }} type="primary" size={'large'} onClick={() => showPaymentModal()} loading={isFetching} >
                                    {isFetching ? "Please Wait":"Make Payment"}
                                </Button>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card bordered={false}>
                                <Statistic title="Pending Tickets" 
                                            value={thirdPartyTickets.reduce((acc, tkt) => {
                                                if (tkt.paid == false) acc += 1
                                                return acc
                                            } ,0) } 
                                            />
                            </Card>
                        </Col>
                        
                    </Row>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col span={23}>
                <PendingTickets isLoading={isLoading} tickets={thirdPartyTickets}/>
            </Col>
        </Row>
    </>
    );
}

export default ThirdPartyCustomers;