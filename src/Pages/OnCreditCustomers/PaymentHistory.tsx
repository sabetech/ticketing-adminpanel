import { Row, Col, Card, Space, Typography, DatePicker } from 'antd';
import type { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const PaymentHistory = () => {

    const [_, setDateRange] = useState<{from:string, to:string} | undefined>({ from: dayjs().startOf('day').format("YYYY-MM-DD HH:mm:ss"), to: dayjs().format("YYYY-MM-DD HH:mm:ss") });
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setDateRange({from: dateStrings[0], to: dateStrings[1]});
        } else {
            console.log('Clear');
        }
    };

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
      ];

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
                                    presets={rangePresets}
                                />
                        </Space>
                    </Space>
                </Space>
                </Card>
            </Col>
        </Row>
    </>
)};

export default PaymentHistory;