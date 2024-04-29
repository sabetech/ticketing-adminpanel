import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Card, Space, Typography, AutoComplete } from 'antd';
import AgentListCard from '../../Components/Agents/AgentCardList';
import { Agent } from "../../Types/Agent";
import { AppError, RemoteResponse } from "../../Types/Remote";
import {getAgentList} from "../../Services/AgentService";


const Agents = () => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const { data, isLoading, isSuccess } = useQuery<RemoteResponse<Agent[]> | AppError>({
        queryKey: ['agents'],
        queryFn: async () => getAgentList()
    });

    useEffect(() => {

        if (data?.success) {
            setAgents(data.data)
        }

    },[data]);

    const [value, setValue] = useState('');
    
    const onChange = (data: string) => {
        setValue(data);
    };
    
    const onSelect = (data: string) => {
        const selectedAgent = agents.filter(agt => agt.fname+" "+agt.lname ===data);
        setAgents(selectedAgent)
    };
    
    const clearSearch = () => {
        if (isSuccess && data.success)
            setAgents(data.data);
    }
    

return (
        <>
            <Row>
                <Col span={23}>
                    <Card title={"Agents"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                            
                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Search For Agents</Typography>
                                <AutoComplete
                                    size="large"
                                    value={value}
                                    onClear={clearSearch}
                                    allowClear
                                    options={agents.map( agt => ({
                                        key: agt.id,
                                        label: `${agt.fname} ${agt.lname} (${agt?.stationInfo?.name ?? "No Station"})`,
                                        value: agt.fname +" "+agt.lname
                                    }))}
                                    style={{ width: 500 }}
                                    onSelect={onSelect}
                                    onChange={onChange}
                                    placeholder="Search for Agents"
                                    filterOption={(inputValue, option) => 
                                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </Space>

                        </Space>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={23}>
                    <AgentListCard agents={agents} isLoading={isLoading} />
                </Col>
            </Row>
        </>
)
};

export default Agents;