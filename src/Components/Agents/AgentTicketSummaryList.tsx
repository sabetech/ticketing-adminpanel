import { useEffect, useState } from 'react'
import {Avatar, List, Typography, Statistic, Row, Col} from 'antd'

type AgentTicketSummaryListProps = {
    agentTicketInfoData: any
}

const AgentTicketSummaryList:React.FC<AgentTicketSummaryListProps> = ({agentTicketInfoData}) => {

    const [summarizedData, setSummarized] = useState([]);
    const [summarizedTaskforce, setSummarizedTaskforce] = useState([]);
    const [summarizedPostpaid, setSummarizedPostpaid] = useState([]);
    const [summarizedFlexible, setSummarizedFlexible] = useState([]);
    

    useEffect(() => {
        if (agentTicketInfoData) {
            console.log("AGENT TICKET INFO ::", agentTicketInfoData);
            const summarizedInfo = groupByRate(agentTicketInfoData);
            const taskforce = groupByTaskforce(agentTicketInfoData);
            const postpaid = groupByPostpaid(agentTicketInfoData);
            const flexible = groupByFlexible(agentTicketInfoData);

            console.log("SUMMARISED::", summarizedInfo)
            setSummarized(summarizedInfo);
            setSummarizedTaskforce(taskforce);
            setSummarizedPostpaid(postpaid);
            setSummarizedFlexible(flexible);
        }
        

    }, [agentTicketInfoData])

    const groupByRate = (data) => {
        const result = {};
        for (const item of data) {
          const rateTitle = item.rate.title;
          const icon = item.rate.icon
          if (!result[rateTitle]) {
            result[rateTitle] = { key:rateTitle, rateIcon: icon, rate: rateTitle, total: 0, count: 0 };
          }
          result[rateTitle].total += parseFloat(item.amount);
          result[rateTitle].count += 1;
          result[rateTitle].type = item.rate.rate_type
        }
        return Object.values(result);
    }

    const groupByTaskforce = (data) => {
        const result = {};
        for (const item of data) {
          const rateTitle = item.rate.title;
          if (!rateTitle.toLowerCase().includes('taskforce')) continue;
          const icon = item.rate.icon
          if (!result[rateTitle]) {
            result[rateTitle] = { key:rateTitle, rateIcon: icon, rate: rateTitle, total: 0, count: 0 };
          }
          result[rateTitle].total += parseFloat(item.amount);
          result[rateTitle].count += 1;
          result[rateTitle].type = item.rate.rate_type
        }
        return Object.values(result);
    }

    const groupByPostpaid = (data) => {
        const result = {};
        for (const item of data) {
            
            if ((item.rate.is_postpaid != "1") || (item.rate.rate_type != "fixed")) continue;
            const rateTitle = item.rate.title;
          
          const icon = item.rate.icon
          if (!result[rateTitle]) {
            result[rateTitle] = { key:rateTitle, rateIcon: icon, rate: rateTitle, total: 0, count: 0 };
          }
          result[rateTitle].total += parseFloat(item.amount);
          result[rateTitle].count += 1;
          result[rateTitle].type = item.rate.rate_type
        }
        return Object.values(result);
    }

    const groupByFlexible = (data) => {
        const result = {};
        for (const item of data) {
            
            if (item.rate.rate_type != "flexible") continue;
            const rateTitle = item.rate.title;
          
            const icon = item.rate.icon
            if (!result[rateTitle]) {
                result[rateTitle] = { key:rateTitle, rateIcon: icon, rate: rateTitle, total: 0, count: 0 };
            }
            result[rateTitle].total += parseFloat(item.amount);
            result[rateTitle].count += 1;
            result[rateTitle].type = item.rate.rate_type
        }
        return Object.values(result);
    }

    return (<>
        <Row>
            <Col>
                <List
                    size="large"
                    header={<div>Agent Ticket Summary (Task Force)</div>}
                    renderItem={(item) => <List.Item key={item.key}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.rateIcon} />}
                            title={<a href="#">{item.rate}</a>}
                            description={"Ticket Issued:"+item.count}
                        />
                            <div><Typography.Title level={4}>{item.total}</Typography.Title></div>
                        </List.Item>
                    }
                    bordered
                    style={{width: '25vw'}}
                    dataSource={summarizedTaskforce}
                    footer={<Row style={{marginTop: 5}}>
                                    
                    <Col style={{marginRight: '10%'}}>
                        <Statistic title="Tickets Issued" value={summarizedTaskforce.length} />
                    </Col>
                    
                    <Col >
                        <Statistic title="Total Amount" value={summarizedTaskforce?.reduce((acc, tkt) => acc + parseFloat(tkt.total), 0)} suffix="GHC" />
                    </Col>
                    
                </Row>
                }
                />
            </Col>

            <Col>
                <List
                    size="large"
                    header={<div>Agent Ticket Summary (Postpaid)</div>}
                    renderItem={(item) => <List.Item key={item.key}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.rateIcon} />}
                            title={<a href="#">{item.rate}</a>}
                            description={"Ticket Issued:"+item.count}
                        />
                            <div><Typography.Title level={4}>{item.total}</Typography.Title></div>
                        </List.Item>
                    }
                    bordered
                    style={{width: '25vw'}}
                    dataSource={summarizedPostpaid}
                    footer={<Row style={{marginTop: 5}}>
                                    
                    <Col style={{marginRight: '10%'}}>
                        <Statistic title="Tickets Issued" value={summarizedPostpaid.length} />
                    </Col>
                    
                    <Col >
                        <Statistic title="Total Amount" value={summarizedPostpaid?.reduce((acc, tkt) => acc + parseFloat(tkt.total), 0)} suffix="GHC" />
                    </Col>
                    
                </Row>
                }
                />
            </Col>
        </Row>

        <Row>
            <Col>
                <List
                    size="large"
                    header={<div>Agent Ticket Summary (Flexible)</div>}
                    renderItem={(item) => <List.Item key={item.key}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.rateIcon} />}
                            title={<a href="#">{item.rate}</a>}
                            description={"Ticket Issued:"+item.count}
                        />
                            <div><Typography.Title level={4}>{item.total}</Typography.Title></div>
                        </List.Item>
                    }
                    bordered
                    style={{width: '25vw'}}
                    dataSource={summarizedFlexible}
                    footer={<Row style={{marginTop: 5}}>
                                    
                    <Col style={{marginRight: '10%'}}>
                        <Statistic title="Tickets Issued" value={summarizedFlexible.length} />
                    </Col>
                    
                    <Col >
                        <Statistic title="Total Amount" value={summarizedFlexible?.reduce((acc, tkt) => acc + parseFloat(tkt.total), 0)} suffix="GHC" />
                    </Col>
                    
                </Row>
                }
                />
            </Col>

            <Col>
                <List
                    size="large"
                    header={<div>Agent Ticket Summary (Combined)</div>}
                    renderItem={(item) => <List.Item key={item.key}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.rateIcon} />}
                            title={<a href="#">{item.rate}</a>}
                            description={"Ticket Issued:"+item.count}
                    />
                            <div><Typography.Title level={4}>{item.total}</Typography.Title></div>
                        </List.Item>
                    }
                    bordered
                    style={{width: '25vw'}}
                    dataSource={summarizedData}
                    footer={<Row style={{marginTop: 5}}>
                                    
                    <Col style={{marginRight: '10%'}}>
                        <Statistic title="Tickets Issued" value={agentTicketInfoData?.length ?? 0} />
                    </Col>
                    
                    <Col >
                        <Statistic title="Total Amount" value={agentTicketInfoData?.reduce((acc, tkt) => acc + parseFloat(tkt.amount), 0)} suffix="GHC" />
                    </Col>
                    
                </Row>
                }
                />
            </Col>
        </Row>

    </>
    )
 }

 export default AgentTicketSummaryList;