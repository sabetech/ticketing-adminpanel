import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Space,Card, DatePicker, Typography, List, Avatar, Divider, Statistic, Spin } from 'antd';
import type { TimeRangePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { getStationSummary } from "../../Services/Station";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
type StationTicketAggregate = {
    key: string,
    icon: string,
    title: string,
    total: number,
    count: number
}

const StationTicketSummary = () => {
    const [dateRange, setDateRange] = useState<{from:string, to:string}>(
        {
            from: dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), 
            to: dayjs().endOf('day').format("YYYY-MM-DD HH:mm:ss")
        });
    const [stationTicketsData, setStationTicketData] = useState<{}>();

    const { data: stationTicketSummaryData, isLoading } = useQuery({
        queryKey: ['stationTicketSummary', dateRange],
        queryFn: async () => {
            if (typeof dateRange === 'undefined') {
                return getStationSummary({from: dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), to: dayjs().endOf('day').format("YYYY-MM-DD HH:mm:ss")})
            }else {
                return getStationSummary(dateRange)
            }
        }
    });

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs()] },
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
      ];
    
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setDateRange({from: dateStrings[0], to: dateStrings[1]});
        }
    };

    useEffect(() => {

        if (stationTicketSummaryData) {
            const transformedOutput = {};
            for (const key in stationTicketSummaryData.data) {
                if (stationTicketSummaryData.data.hasOwnProperty(key)) {
                    const transactions = stationTicketSummaryData.data[key];
            
                    const groupedTotals = transactions.reduce((acc, transaction) => {
                        const rateTitle = transaction.rate.title;
                        const amount = parseFloat(transaction.amount);
            
                        if (!acc[rateTitle]) {
                            // Initialize a new entry for this rate title
                            acc[rateTitle] = {
                                key: rateTitle,
                                icon: transaction.rate.icon,
                                title: rateTitle,
                                total: 0.00,
                                count: 0
                            } as StationTicketAggregate;
                        }
            
                        // Add the amount to the total for this rate title
                        acc[rateTitle].total += amount;
                        acc[rateTitle].count += 1;
            
                        return acc;
                    }, {});
            
                    // Convert groupedTotals object into an array of result objects
                    const result = Object.values(groupedTotals);
            
                    // Assign the result array to the corresponding key in transformedOutput
                    transformedOutput[key] = result;
                }
            }

            setStationTicketData(transformedOutput)

        }
    }, [stationTicketSummaryData]);

    return (<>
        <Row>
            <Col span={23}>
                <Card title={"Station Summary - From: "+dayjs(dateRange.from).format("DD MMM YYYY HH:mm")+" To: "+dayjs(dateRange.to).format("DD MMM YYYY HH:mm")} style={{textAlign: 'left'}}>
                    <Space direction={"vertical"} align={'start'} >
                    <Typography>Date Filter</Typography>
                        <RangePicker
                            size={"large"}
                            presets={[
                                {
                                label: <span aria-label="Start of Day to Now">Start of Day ~ Now</span>,
                                value: () => [dayjs().startOf('day'), dayjs().endOf('day')],
                                },
                                ...rangePresets,
                            ]}
                            defaultValue={[dayjs().startOf('day'), dayjs().endOf('day')]}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={onRangeChange}
                        />
                    </Space>
                </Card>
            </Col>
        </Row>

        {
            isLoading && <Spin size="large" style={{marginTop: 20}} />
        }

        <Row style={{marginTop: 20}}>
            <Col>
                <Space direction="horizontal" style={{alignItems: 'flex-start'}}>
                        {
                           stationTicketsData && Object.keys(stationTicketsData).map(station => {
                            return <>
                            <Divider />
                             <List 
                                size="large"
                                header={<div>{station} Ticket Summary</div>}
                                bordered
                                dataSource={stationTicketsData[station]}
                                renderItem={(item: StationTicketAggregate) => <List.Item key={item.key}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.icon} />}
                                        title={<a href="#">{item.title}</a>}
                                        description={"Ticket Issued: "+item.count}/>
                                
                                <div><Typography.Title level={4}>{item.total}</Typography.Title></div>
                                
                                </List.Item>}
                                
                                footer={<Row style={{marginTop: 5}}>
                    
                                <Col style={{marginRight: '10%'}}>
                                    <Statistic title="Tickets Issued" value={stationTicketsData[station]?.reduce((acc, tkt) => acc + parseFloat(tkt.count), 0) ?? 0} />
                                </Col>
                                
                                <Col >
                                    <Statistic title="Total Amount" value={stationTicketsData[station]?.reduce((acc, tkt) => acc + parseFloat(tkt.total), 0)} suffix="GHC" />
                                </Col>
                                    
                            </Row>}
                        />
                            </>
                           })
                        }
                </Space>
            </Col>
        </Row>
    </>)
}

export default StationTicketSummary;