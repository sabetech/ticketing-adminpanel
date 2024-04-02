import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Card, Space, Typography } from 'antd';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import AgentList from '../../Components/Agents/AgentList';
import { Agent } from "../../Types/Agent";
import { AppError, RemoteResponse } from "../../Types/Remote";
import {getAgentList} from "../../Services/AgentService";


const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const Agents = () => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const { data, isLoading } = useQuery<RemoteResponse<Agent[]> | AppError>({
        queryKey: ['agents'],
        queryFn: async () => getAgentList()
    });

    useEffect(() => {

        if (data?.success) {
            setAgents(data.data)
        }

    },[data])
    

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
                    <AgentList agents={agents} isLoading={isLoading} />
                </Col>
            </Row>
        </>
)
};

export default Agents;