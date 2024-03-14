import { Row, Col, Card, Space, Typography, DatePicker, Input, Statistic, Button } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import PendingTickets from '../../Components/ThirdParty/PendingTickets';

const { RangePicker } = DatePicker;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const ThirdPartyCustomers = () => {
    return (
    <>
        <Row>
            <Col span={23}>
                <Card title={"Filter Options"} style={{textAlign: 'left'}}>
                    <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                        <Space direction="vertical" style={{textAlign: 'left', marginRight: '3rem'}}> 
                            <Typography>Date Filter</Typography>
                            <Space direction="horizontal" >
                                <RangePicker showTime size={'large'}/>
                                
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
                            <Statistic title="Pending Payments" value={89} />
                        </Col>
                        <Col span={4}>
                            <Statistic title="Pending Amount GHC" value={112893} precision={2} />
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