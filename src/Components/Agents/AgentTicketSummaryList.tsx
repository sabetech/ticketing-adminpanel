import { useEffect, useState } from 'react'
import {Avatar, List, Typography, Statistic, Row, Col} from 'antd'

type AgentTicketSummaryListProps = {
    agentTicketInfoData: any
}

const AgentTicketSummaryList:React.FC<AgentTicketSummaryListProps> = ({agentTicketInfoData}) => {

    const [summarizedData, setSummarized] = useState([]);
    

    useEffect(() => {
        if (agentTicketInfoData) {
            console.log("AGENT TICKET INFO ::", agentTicketInfoData);
            const summarizedInfo = groupByRate(agentTicketInfoData)

            console.log("SUMMARISED::", summarizedInfo)
            setSummarized(summarizedInfo);    
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
        }
        return Object.values(result);
    }


    return (<>
        <List
            size="large"
            header={<div>Agent Ticket Summary</div>}
            footer={<Row style={{marginTop: 5}}>
                            
            <Col style={{marginRight: '10%'}}>
                <Statistic title="Tickets Issued" value={agentTicketInfoData?.length ?? 0} />
            </Col>
            
            <Col >
                <Statistic title="Total Amount" value={agentTicketInfoData?.reduce((acc, tkt) => acc + parseFloat(tkt.amount), 0)} suffix="GHC" />
            </Col>
            
        </Row>}
            bordered
            style={{width: '25vw'}}
            dataSource={summarizedData}
            renderItem={(item) => <List.Item key={item.key}>
                <List.Item.Meta
                    avatar={<Avatar src={item.rateIcon} />}
                    title={<a href="#">{item.rate}</a>}
                    description={"Ticket Issued:"+item.count}
              />
                    <div><Typography.Title level={4}>{item.total}</Typography.Title></div>
                </List.Item>
            }
        />
    </>)
 }

 export default AgentTicketSummaryList;