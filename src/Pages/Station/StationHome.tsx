import { Row, Col, Space, Typography, Card, Button } from 'antd';
import { Input, Select, DatePicker } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { RangePicker } = DatePicker;
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const StationHome = () => {

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };

    return (
        <>
            <Row>
                <Col span={23}>
                    <Card title={"Station"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Select Station</Typography>
                                <Select
                                    defaultValue="All"
                                    style={{ width: 120 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'all', label: 'All' },
                                        { value: 'achimota', label: 'Achimota' },
                                        { value: 'cirlce', label: 'Circle' },
                                    ]}
                                />
                            </Space>
                            <Space direction="vertical" style={{textAlign: 'left', marginRight: '3rem'}}> 
                                <Typography>Date Filter</Typography>
                                <Space direction="horizontal" >
                                    <RangePicker showTime size={'large'}/>
                                    <Button type="primary" size={'large'} style={{justifySelf:'flex-end'}}>
                                        Go!
                                    </Button>
                                </Space>
                            </Space>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={23}>
                    
                </Col>
            </Row>
        </>
    )
}

export default StationHome;