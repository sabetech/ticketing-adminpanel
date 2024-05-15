import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Row, Col, Card, List, Avatar, Typography, message } from 'antd';
import { CheckCircleTwoTone, LoadingOutlined } from '@ant-design/icons';
import { getAgentList } from '../../Services/AgentService';
import { Rate } from '../../Types/Rate';
import { RemoteResponse, AppError } from '../../Types/Remote';
import { Agent } from '../../Types/Agent';
import * as urls from '../../Constants/Urls';
import "./AgentRateAssignment.css";
import { getRateByAgent } from '../../Services/AgentService'
import * as Urls from '../../Constants/Urls'


const AgentRateAssignment = () => {

    const [selectedAgent, setSelectedAgent] = useState<Agent>();
    const [selectedRateIds, setSelectedRateIds] = useState<number[]>([]);
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    const { data: agents, isLoading } = useQuery<RemoteResponse<Agent[]> | AppError>({
        queryKey: ['agents'],
        queryFn: async () => getAgentList()
    });

    const { data: agentRates, isLoading: loadingRates } = useQuery({
        queryKey: ['agent_rates', selectedAgent],
        queryFn: async () => getRateByAgent(selectedAgent.id)
    });

    const { mutate: modifyAgentRates, isPending } = useMutation({
        mutationFn: (values: any) => modifyAgentRates(values.agentId, values.rateIds),
        onSuccess: (data: any) => { 
            queryClient.invalidateQueries();
            messageApi.success(data.message);
        }
    });

    const selectRate = (rate) => {
        
        if (selectedRateIds.some(id => rate.id == id )) {
            setSelectedRateIds(selectedRateIds.filter(id => id !== rate.id));
            return
        }

        modifyAgentRates({
            agentId: selectedAgent.id,
            rateIds: selectedRateIds
        });

        setSelectedRateIds([...selectedRateIds, rate.id]);

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
                                    <List.Item style={{ cursor: 'pointer', backgroundColor: selectedAgent?.id === agt.id ? '#11aabb': '' }} onClick={() => {
                                        setSelectedRateIds([]);
                                        setSelectedAgent(agt);
                                    }}
                                    > 
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
                            <Card title={`Choose Rates for ${selectedAgent?.fname ?? 'unknown'}`}>
                                <List 
                                    size={'large'}
                                    loading={loadingRates}
                                    itemLayout="horizontal"
                                    dataSource={agentRates?.success ? agentRates.data : []}
                                    renderItem={(rate: Rate) => {
                                        
                                            if (!selectedRateIds.includes(rate.id) && selectedRateIds.length > 0)
                                                return (<List.Item style={{ cursor: 'pointer' }} onClick={() => selectRate(rate)}> 
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={
                                                            rate.icon.startsWith('http') ? rate.icon : `${Urls.RATE_BASE_URL}${rate.icon.substring(6) }` 
                                                        } />}
                                                        title={<Typography.Text style={{color: '#d3d3d3'}}>{rate.title}</Typography.Text>}
                                                    />
                                                    </List.Item>)
                                            
                                            return (<List.Item style={{ cursor: 'pointer' }} onClick={() => selectRate(rate)} extra={isPending ? <LoadingOutlined /> : <CheckCircleTwoTone twoToneColor="#52c41a" />}> 
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