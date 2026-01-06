import { useState } from "react";

import { Tabs, Row, Col, Space,Card, DatePicker, Typography, List, Avatar, Statistic, Spin } from 'antd';
import type { TabsProps, TimeRangePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

import dayjs from "dayjs";
import { useGetStationSummaryAggregates } from "../../hooks/StationSummaryHooks";
import { transformStationSummaryAggregates, TransfromedStationSummaryAggregates } from "./StationUtils";

const { RangePicker } = DatePicker;


const StationTicketSummary = () => {
    const [dateRange, setDateRange] = useState<{from:string, to:string}>(
        {
            from: dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), 
            to: dayjs().endOf('day').format("YYYY-MM-DD HH:mm:ss")
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

    const { isLoading, data, isSuccess } = useGetStationSummaryAggregates({from: dateRange.from, to: dateRange.to});
    let items: TabsProps['items'] = [];

    if (isSuccess) {
        console.log("Station Summary Data::", data);
        const transformed = transformStationSummaryAggregates(data);
        console.log("Transformed Station Summary Data::", transformed);
    

        items = transformed.map((stationSummary: TransfromedStationSummaryAggregates, index) => {
                return {
                    key: index.toString(),
                    label: `${stationSummary.name}`,
                    children: (
                    <>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div>
                            {
                                stationSummary.ratetype.map((rateType) => (
                                    <div key={rateType.type} style={{width: "25vw", marginRight: 50}}>
                                        <List
                                            header={<Space direction="horizontal" style={{width: '100%', justifyContent: 'space-between', backgroundColor: '#F9FAFB', padding: 10, borderRadius: 5, boxShadow: '0 3px 4px rgba(0, 0, 0, 0.09)'}}><Typography.Title level={4}>{rateType.type.toUpperCase()}</Typography.Title></Space>}
                                            dataSource={rateType.aggregations}
                                            renderItem={(item: {title: string, icon: string, total: string, ticket_count: string}) => (
                                                <List.Item 
                                                    extra={<strong>{item.total} GHS</strong>}
                                                    style={{justifyContent: 'space-between', alignItems: 'center', padding: 20}}
                                                >
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.icon} size={42} />}
                                                        title={item.title}
                                                        description={`${item.ticket_count} Tickets Issued`}
                                                        style={{textAlign: 'left'}}
                                                    />   
                                                        
                                                    
                                                </List.Item>
                                            )}
                                            
                                            footer={
                                                <Space direction="horizontal" style={{width: '100%', justifyContent: 'space-between', backgroundColor: '#F9FAFB', padding: 10, borderRadius: 5, boxShadow: '0 3px 4px rgba(0, 0, 0, 0.09)'}}>
                                                <Statistic
                                                    title="Total Tickets Issued"
                                                    value={rateType.aggregations?.reduce((acc, tkt) => acc + parseInt(tkt.ticket_count), 0) ?? 0}
                                                />
                                                 <Statistic
                                                    title="Ticket Revenue"
                                                    value={rateType.aggregations?.reduce((acc, tkt) => acc + parseFloat(tkt.total), 0) ?? 0}
                                                    suffix="GHC"
                                                    valueStyle={{ color: '#3f8600' }}
                                                />
                                                </Space>
                                            }
                                        />
                                    </div>
                                ))
                            }
                            
                        </div>
                        <div>
                            <Card variant="borderless" style={{width: '35vw', marginLeft: 50}}>
                                <Space direction="horizontal" style={{width: '100%', justifyContent: 'space-evenly'}}>
                                    <Statistic
                                    title="Grand Total Revenue"
                                    value={stationSummary.ratetype?.reduce((acc, rateType) => acc + rateType.aggregations.reduce((subAcc, tkt) => subAcc + parseFloat(tkt.total), 0), 0) ?? 0}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="GHC"
                                    />
                                    <Statistic
                                    title="Total Number of Tickets"
                                    value={stationSummary.ratetype?.reduce((acc, rateType) => acc + rateType.aggregations.reduce((subAcc, tkt) => subAcc + parseInt(tkt.ticket_count), 0), 0) ?? 0}
                                    
                                    valueStyle={{ color: '#cf1322' }}
                                    
                                    suffix="Tickets"
                                    />
                                </Space>
                            </Card>
                                
                        </div>
                    </div>
                    </>
                    )
                }
            });
        }


    return (<>
        <Row>
            <Col span={20}>
                <Card title={<div>{"Station Summary - From: "+dayjs(dateRange.from).format("DD MMM YYYY HH:mm")+" To: "+dayjs(dateRange.to).format("DD MMM YYYY HH:mm")}</div>} extra={isLoading && <Spin/>} style={{textAlign: 'left'}}>
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
        <Row style={{marginTop: 20}}>
            <Col span={20}>
                <Tabs defaultActiveKey="1" items={items} />;
            </Col>
        </Row>

    </>)
}

export default StationTicketSummary;