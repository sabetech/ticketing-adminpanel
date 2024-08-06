import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Space,Card, DatePicker, Typography, List, Avatar, Statistic, Spin } from 'antd';
import type { TimeRangePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { getStationSummary } from "../../Services/Station";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
type MyRate = {
    id: number,
    key: string,
    icon: string,
    title: string,
    is_postpaid: string,
    total: number,
    count: number,
    rate_type: string,
}

type IncomingPayload = {
    [key: string]: Array<PayloadEntry>
}

type PayloadEntry = {
    agent_name: string,
    amount: string,
    car_number: string,
    device_id: string,
    id: number,
    issued_date_time: string,
    paid: string,
    rate: MyRate,
    rate_title: string,
    station_name: string,
    title: string
}

type StationTicketAggregate = {
    key: number,
    icon: string,
    title: string,
    is_postpaid: boolean,
    total: number,
    count: number
}

const StationTicketSummary = () => {
    const [dateRange, setDateRange] = useState<{from:string, to:string}>(
        {
            from: dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), 
            to: dayjs().endOf('day').format("YYYY-MM-DD HH:mm:ss")
        });

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

    const [transformedStationSummary, setTransformedStationSummary] = useState<{}>({});

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

    const transformPayload = (payload: IncomingPayload) => {
        const transformed = {};
    
        for (const [terminal, entries] of Object.entries(payload)) {
            const aggregations = {};
            
            entries.forEach(entry => {
                const rateType = entry.rate.is_postpaid === "1" ? "postpaid" :
                    entry.rate.title.includes("Taskforce") ? "Taskforce" : entry.rate.rate_type;
                const key = entry.rate.id;
                const amount = parseFloat(entry.amount);
    
                if (!aggregations[rateType]) {
                    aggregations[rateType] = {};
                }
    
                if (!aggregations[rateType][key]) {
                    aggregations[rateType][key] = {
                        key: key,
                        icon: entry.rate.icon,
                        title: entry.rate.title,
                        is_postpaid: entry.rate.is_postpaid === "1",
                        total: 0,
                        count: 0
                    };
                }
                aggregations[rateType][key].total += amount;
                aggregations[rateType][key].count += 1;
            });
    
            transformed[terminal] = Object.entries(aggregations).map(([rateType, aggregationEntries]) => ({
                rate_type: rateType,
                aggregations: Object.values(aggregationEntries)
            }));
        }
    
        return transformed;
    };
    
    useEffect(() => {

      if (stationTicketSummaryData) {
        const result = transformPayload(stationTicketSummaryData.data);
        console.log(result);
        setTransformedStationSummary(result)
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
            <Col span={23}>
                {
                    Object.keys(transformedStationSummary).map(station => 
                        <>  
                            <Card title={`Station Summary - ${station}`}>
                                    <Space style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        flexWrap: 'wrap'

                                    }}>
                                    {
                                        transformedStationSummary[station].map(rateData => 
                                            <List 
                                                style={{margin: 20, minWidth: '23vw', maxWidth: '25vw'}}
                                                size="large"
                                                header={<div><strong>Ticket Summary {rateData.rate_type.toUpperCase() }</strong></div>}
                                                bordered
                                                dataSource={rateData.aggregations}
                                                renderItem={
                                                    (item: StationTicketAggregate) => <List.Item key={item.key}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src={item.icon} />}
                                                            title={<a href="#">{item.title}</a>}
                                                            description={"Ticket Issued: "+item.count}/>
                                                            <div><Typography.Title level={4}>{item.total}</Typography.Title></div>
                                                    </List.Item>
                                                }
                                                footer={<Row style={{marginTop: 5}}>
                                                    <Col style={{marginRight: '10%'}}>
                                                        <Statistic title="Tickets Issued" value={rateData.aggregations?.reduce((acc, tkt) => acc + parseFloat(tkt.count), 0) ?? 0} />
                                                    </Col>
                                                    <Col >
                                                        <Statistic title="Total Amount" value={rateData.aggregations?.reduce((acc, tkt) => acc + parseFloat(tkt.total), 0)} suffix="GHC" />
                                                    </Col>
                                                </Row>}
                                        />
                                        )
                                    }
                                    </Space>
                            </Card>  
                        </>
                    )
                }
                
            </Col>
        </Row>

    </>)
}

export default StationTicketSummary;