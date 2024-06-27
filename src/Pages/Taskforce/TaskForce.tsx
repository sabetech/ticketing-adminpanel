import { useState, useEffect } from 'react';
import { Row, Col, Space, Typography, Card, Statistic } from 'antd';
import { Select, DatePicker } from 'antd';
import TableTaskForce from '../../Components/TaskForce/TableTaskForce';
import { useQuery } from '@tanstack/react-query';
import { RemoteResponse, AppError } from '../../Types/Remote';
import { Ticket } from '../../Types/Tickets';
import { getTaskforceTickets } from '../../Services/TicketService';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { TimeRangePickerProps } from 'antd';
// import type { SearchProps } from 'antd/es/input/Search';

const { RangePicker } = DatePicker;
// const { Search } = Input;
// const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const TaskForce = () => {

    const defaultDateRange = [dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), dayjs().endOf('day').format("YYYY-MM-DD HH:mm:ss")];

    const [dateRange, setDateRange] = useState<string[]>(defaultDateRange)
    
//load tickets for taskforce for the default date range
    const { data: taskforceData } = useQuery<RemoteResponse<Ticket[]> | AppError>({
        queryKey: ['taskforceTickets', dateRange],
        queryFn: async () => getTaskforceTickets(dateRange)
      });

    const [tickets, setTickets] = useState<Ticket[]>([]);
    useEffect(() => {
        if (taskforceData?.success) {
            setTickets(taskforceData.data.map(tkt => ({...tkt, key: tkt.id})))
        }

    },[taskforceData]);

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs()] },
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
      ];
    
      const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setDateRange(dateStrings);
        }
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };

    return (
        <>
            <Row>
                <Col span={23}>
                    <Card title={"Task force"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Select Station</Typography>
                                <Select
                                    size='large'
                                    defaultValue="All"
                                    style={{ width: '20vw' }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'all', label: 'All' },
                                        { value: 'achimota', label: 'Achimota' },
                                        { value: 'circle', label: 'Circle' },
                                    ]}
                                />
                            </Space>
                            <Space direction="vertical" style={{textAlign: 'left', marginRight: '3rem'}}> 
                                <Typography>Date Filter</Typography>
                                <Space direction="horizontal" >
                                    <RangePicker 
                                        showTime 
                                        size={'large'}
                                        presets={[
                                            {
                                            label: <span aria-label="Start of Day to Now">Start of Day ~ Now</span>,
                                            value: () => [dayjs().startOf('day'), dayjs()],
                                            },
                                            ...rangePresets,
                                        ]}
                                        onChange={onRangeChange}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        defaultValue={[dayjs().startOf('day'), dayjs().endOf('day')]}
                                        />
                                </Space>
                            </Space>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{marginTop: '2%', marginBottom: '2%'}}>
                <Col span={4}>
                    <Card bordered={true}>
                        <Statistic title="Taskforce Tickets" value={tickets.length ?? 0} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={true}>
                        <Statistic title="Taskforce Total Amount" value={tickets.reduce((acc: number, tkt:any) => parseFloat(tkt.amount) + acc, 0) } valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={23}>
                    <TableTaskForce tickets={tickets} />
                </Col>
            </Row>
        </>
    )
}

export default TaskForce;