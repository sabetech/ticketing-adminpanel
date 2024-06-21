import { useEffect, useState } from 'react'
import {Avatar, List, Typography, Statistic, Row, Col, Card, Space} from 'antd'

type AgentTicketSummaryListProps = {
    agentTicketInfoData: any
}

const AgentTicketSummaryList:React.FC<AgentTicketSummaryListProps> = ({agentTicketInfoData}) => {

    const [grandTotal, setGrandTotal] = useState({tickets: 0, totalAmount: 0});
    const [summarizedTaskforce, setSummarizedTaskforce] = useState([]);
    const [summarizedPostpaid, setSummarizedPostpaid] = useState([]);
    const [summarizedFlexible, setSummarizedFlexible] = useState([]);
    const [summarizedFixed, setSummarizedFixed] = useState([]);
    

    useEffect(() => {
        if (agentTicketInfoData) {
            console.log("AGENT TICKET INFO ::", agentTicketInfoData);
            // const summarizedInfo = groupByRate(agentTicketInfoData);
            const taskforce = groupByTaskforce(agentTicketInfoData);
            const postpaid = groupByPostpaid(agentTicketInfoData);
            const flexible = groupByFlexible(agentTicketInfoData);
            const fixed = groupByFixed(agentTicketInfoData);
            const overall = overallTotal(agentTicketInfoData);

            // console.log("SUMMARISED::", summarizedInfo)
            // setSummarized(summarizedInfo);
            setSummarizedTaskforce(taskforce);
            setSummarizedPostpaid(postpaid);
            setSummarizedFlexible(flexible);
            setSummarizedFixed(fixed)
            setGrandTotal(overall)

        }
        

    }, [agentTicketInfoData])

    const overallTotal = (data) => {
        const result = {
            tickets: 0,
            totalAmount: 0.0
        };

        for (const item of data) {
         result.totalAmount += parseFloat(item.amount)
         result.tickets += 1
        }
        return result
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

    const groupByFixed = (data) => {
        const result = {};
        for (const item of data) {
            
            if (item.rate.rate_type != "fixed") continue;
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
                    header={<div>Agent Ticket Summary (Fixed)</div>}
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
                    dataSource={summarizedFixed}
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

        <Row>
            <Col>
                <Space direction="horizontal">
                    <Card title="Overall Total Amount">
                        <Typography.Title level={3}>{grandTotal.totalAmount} GHC</Typography.Title> 
                    </Card>
                    <Card title="Total Ticket Count">
                    <Typography.Title level={3}>{grandTotal.tickets}</Typography.Title>
                    </Card>
                </Space>
            </Col>
        </Row>

    </>
    )
 }

 export default AgentTicketSummaryList;