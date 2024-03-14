import { Row, Col, Card, Select, Typography, Space, Button } from 'antd';
import RatesTable from '../../Components/RatesAndCategories/RatesTable';

const Rates = () => {

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <Row>
                <Col span={23}>
                    <Card title={"Rates"} style={{textAlign: 'left'}}>
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
                        </Space>
                        <Button type={'primary'} size={'large'} style={{float: 'right'}}>Add New Rate</Button>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={23}>
                    <RatesTable />
                </Col>
            </Row>
        </>
    )
};

export default Rates;