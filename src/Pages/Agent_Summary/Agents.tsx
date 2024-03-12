import { Row, Col, Card, Space, Typography } from 'antd';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import AgentList from '../../Components/Agents/AgentList';

const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const Agents = () => {

return (
        <>
            <Row>
                <Col span={23}>
                    <Card title={"Agents"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Search For Agents</Typography>
                                <Search
                                    placeholder="Search Agent Name"
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
                    <AgentList />
                </Col>
            </Row>
        </>
)
};

export default Agents;