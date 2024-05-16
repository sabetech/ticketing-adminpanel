import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Row, Col, Card, List, Avatar, Typography } from 'antd';
import { CheckCircleTwoTone, LoadingOutlined } from '@ant-design/icons';
import { getAgentList } from '../../Services/AgentService';
import { Rate } from '../../Types/Rate';
import { RemoteResponse, AppError } from '../../Types/Remote';
import { Agent } from '../../Types/Agent';
import * as urls from '../../Constants/Urls';
import "./AgentRateAssignment.css";
import { getRateByAgent, updateAgentRateAssignment } from '../../Services/AgentService'
import * as Urls from '../../Constants/Urls'


const AgentRateAssignment = () => {

    const [selectedAgent, setSelectedAgent] = useState<Agent>();
    const [selectedRate, setSelectedRate] = useState<Rate>();
    const [hasFilter, setHasFilter] = useState(false);
    const queryClient = useQueryClient();

    const { data: agents, isLoading } = useQuery<RemoteResponse<Agent[]> | AppError>({
        queryKey: ['agents'],
        queryFn: async () => getAgentList()
    });

    const { data: agentRates, isLoading: loadingRates, isRefetching, isFetchedAfterMount  } = useQuery({
        queryKey: ['agent_rates', selectedAgent],
        enabled: typeof selectedAgent !== 'undefined',
        queryFn: async () => getRateByAgent(selectedAgent.id)
    });

    const { mutate: modifyAgentRates, isPending } = useMutation({
        mutationFn: (values: any) => updateAgentRateAssignment({agentId: values.agentId, rateId: values.rateId}),
        onSuccess: (data: any) => { 
            queryClient.invalidateQueries();
            console.log("DATA::", data.data);
        }
    });

    const selectAgent = (agt) => {
       setSelectedAgent(agt);
    }


    useEffect(() => {
        if (isFetchedAfterMount)
            setHasFilter(agentRates.data.some(r => typeof r.pivot !== 'undefined'));

    }, [isFetchedAfterMount, isRefetching])

    const selectRate = (rate) => {
        setSelectedRate(rate)
        modifyAgentRates({
            agentId: selectedAgent.id,
            rateId: rate.id
        });
    }

    return (<>
        <Row>
            <Col span={23}>
                <Card title={"Agent Rates and Station Assignment"} style={{textAlign: 'left'}}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={"Agents"}>
                            <List 
                                size={'large'}
                                loading={isLoading}
                                itemLayout="horizontal"
                                dataSource={agents?.success ? agents.data : []}
                                renderItem={(agt: Agent, index) => (
                                    <List.Item style={{ cursor: 'pointer', backgroundColor: selectedAgent?.id === agt.id ? '#11aabb': '' }} onClick={() => selectAgent(agt)}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={agt.photo.includes('unknown') ? `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}` : `${urls.IMAGE_BASE_URL}${agt.photo.substring(19)}` } />}
                                        title={agt.fname+ " "+agt.lname}
                                        description={agt?.stationInfo?.name ?? "No Station"}
                                    />
                                    </List.Item>
                                )} 
                            />
                            </Card>
                        </Col>

                        <Col span={8}> 
                            <Card title={typeof selectedAgent === 'undefined' ? 'Select an Agent':`Choose Rates for ${selectedAgent.fname }`}>
                                <List 
                                    size={'large'}
                                    loading={loadingRates}
                                    itemLayout="horizontal"
                                    dataSource={agentRates?.success ? agentRates.data : []}
                                    renderItem={(rate: Rate) => {
                                        
                                            if (hasFilter && typeof rate?.pivot === 'undefined')
                                                return (<List.Item style={{ cursor: 'pointer' }} onClick={() => selectRate(rate)} extra={isPending && rate.id == selectedRate.id && <LoadingOutlined />} > 
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={
                                                            rate.icon.startsWith('http') ? rate.icon : `${Urls.RATE_BASE_URL}${rate.icon.substring(6) }` 
                                                        } />}
                                                        title={<Typography.Text style={{color: '#d3d3d3'}}>{rate.title}</Typography.Text>}
                                                    />
                                                    </List.Item>)
                                            
                                            return (<List.Item style={{ cursor: 'pointer' }} onClick={() => selectRate(rate)} extra={isPending && rate.id == selectedRate.id ? <LoadingOutlined /> : <CheckCircleTwoTone twoToneColor="#52c41a" />}> 
                                        <List.Item.Meta
                                            avatar={<Avatar src={
                                                rate.icon.startsWith('http') ? rate.icon : `${Urls.RATE_BASE_URL}${rate.icon.substring(6) }` 
                                            } />}
                                            title={rate.title}
                                        />
                                            
                                        </List.Item>)
                                    }} 
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
     </>
    )
}

export default AgentRateAssignment;