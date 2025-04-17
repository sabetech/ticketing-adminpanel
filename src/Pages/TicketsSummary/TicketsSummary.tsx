import { useEffect, useState } from "react";
import { Card, Space, Typography, DatePicker, Switch, Collapse } from "antd"
import dayjs from "dayjs";
import type { TimeRangePickerProps, CollapseProps } from 'antd';

import TicketFilters from "./TicketFilters";
import TableTickets from "./TableTickets";
import { TFilterType } from "../../Types/Tickets";
import TicketAggregates from "./TicketAggregates";

const { RangePicker } = DatePicker;
const TicketsSummary = () => {
    const defaultDateRange = [dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), dayjs().endOf('day').format("YYYY-MM-DD HH:mm:ss")];
    const [dateRange, setDateRange] = useState<string[]>(defaultDateRange)
    const [rangePickerDisabled, setRangePickerDisabled] = useState<boolean>(false);
    const [filter, setFilter] = useState<TFilterType>({dateRange: dateRange});


    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs()] },
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

    const onchange = (_: any, dateRange: [string, string]) => {
        console.log("CHosen date range::", dateRange)
        setDateRange(dateRange)
    }

    useEffect(() => {

        setFilter((prev) => {
            if (rangePickerDisabled) {
                const {dateRange, ...rest} = prev;

                console.log("REsst::", rest)

                return rest;
            }else{
                return { dateRange: dateRange, ...prev}
            }
        })

    }, [rangePickerDisabled, dateRange])

    const items: CollapseProps['items'] = [
        {
          key: '1',
          label: 'Filter Options',
          children: <TicketFilters setFilter={setFilter}/>,
        },
    ]

    console.log("Filter here:: fron init", filter)

    return (<>
        
            <Card title={"Filter Tickets"} style={{textAlign: 'left'}}>
                <Space direction="horizontal" style={{width: '100%', justifyContent: 'flex-start', marginBottom: '1rem'}}>
                    <Space direction="vertical" style={{textAlign: 'left', marginRight: '3rem'}}> 
                        <Typography>Date Filter</Typography>
                        <Space direction="horizontal" size={'large'}>
                            <RangePicker 
                                showTime 
                                size={'large'} 
                                onChange={onchange}
                                defaultValue={[dayjs().startOf('day'), dayjs().endOf('day')]} 
                                presets={[
                                    {
                                        label: <span aria-label="Start of Day to Now">Start of Day ~ End of Day</span>,
                                        value: () => [dayjs().startOf('day'), dayjs().endOf('day')],
                                    },
                                    ...rangePresets,
                                ]}
                                disabled={rangePickerDisabled}
                            />

                            <Switch defaultChecked onChange={() => {
                                setRangePickerDisabled((prev) => !prev)
                            }} />
                            
                        </Space>
                        <Space style={{width: '100%', justifyContent: 'start', color: 'grey'}} >
                            Tickets showing from {dayjs(dateRange[0]).format("DD-MMM-YYYY hh:mm A")} to {dayjs(dateRange[1]).format("DD-MMM-YYYY hh:mm A")}
                        </Space>
                    </Space>

                    <Space direction="vertical" >
                        <Collapse items={items} />                        
                    </Space>
                </Space>
                <div style={{width: '100%', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <Card title={"Ticket Aggregates"} >
                        <TicketAggregates filters={filter}/>
                    </Card>
                </div>
                <TableTickets filter={filter}/>
                
            </Card>
    </>)
}

export default TicketsSummary