import { useState } from 'react'
import { Space, DatePicker, Row, Col, Typography } from 'antd'
import type { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { getStationSummary } from '../../Services/Station';

const { RangePicker } = DatePicker;

const StationSummary = () => {

    const [dateRange, setDateRange] = useState<{from:string, to:string} | undefined>(undefined);
    // const [stationData, setStationTicketData] = useState();

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

    const { data: stationTicketData } = useQuery({
        queryKey: ['stationSummary', dateRange],
        queryFn: async () => getStationSummary(dateRange)
    });

    console.log("STATION SUMMARY::", stationTicketData)

    // useEffect(() => {

    //     if (stationTicketData) {
    //         const transformedOutput = {};
    //         for (const key in stationTicketData.data) {
    //             if (stationTicketData.data.hasOwnProperty(key)) {
    //                 const transactions = stationTicketData.data[key];
            
    //                 const groupedTotals = transactions.reduce((acc, transaction) => {
    //                     const rateTitle = transaction.rate.title;
    //                     const amount = parseFloat(transaction.rate.amount);
            
    //                     if (!acc[rateTitle]) {
    //                         // Initialize a new entry for this rate title
    //                         acc[rateTitle] = {
    //                             title: rateTitle,
    //                             total: 0.00
    //                         };
    //                     }
            
    //                     // Add the amount to the total for this rate title
    //                     acc[rateTitle].total += amount;
            
    //                     return acc;
    //                 }, {});
            
    //                 // Convert groupedTotals object into an array of result objects
    //                 const result = Object.values(groupedTotals);
            
    //                 // Assign the result array to the corresponding key in transformedOutput
    //                 transformedOutput[key] = result;
    //             }
    //         }

    //         // setStationTicketData(transformedOutput)

    //         console.log("Only NANA::", stationTicketData);

    //     }

    // });


    return (<>
    <Row>
        <Col span={23}>
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
                    defaultValue={[dayjs().startOf('day'), dayjs()]}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={onRangeChange}
                />
            </Space>
            </Col>
        </Row>
        <Space>
            
        </Space>
    </>)
}

export default StationSummary;