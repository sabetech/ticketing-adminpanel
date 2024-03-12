import { Card, Row, Col, Typography, Space, Button } from "antd";
import { DatePicker, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import TableTickets from "../../Components/TicketSummary/TableTickets";

const { RangePicker } = DatePicker;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const TicketsSummary = () => {

    

    return (
        <>
            <Row>
                <Col span={23}>
                    <Card title={"Filter Tickets"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left', marginRight: '3rem'}}> 
                                <Typography>Date Filter</Typography>
                                <Space direction="horizontal" >
                                    <RangePicker showTime size={'large'}/>
                                    <Button type="primary" size={'large'} style={{justifySelf:'flex-end'}}>
                                        Go!
                                    </Button>
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
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={23}>
                    <TableTickets />
                </Col>
            </Row>
        </>
    );
}

export default TicketsSummary;