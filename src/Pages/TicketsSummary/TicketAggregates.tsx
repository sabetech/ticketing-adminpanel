import { Card, Row, Col, Statistic } from "antd"
import { useNavigate } from "react-router-dom"
import { useGetTicketAggregates } from "../../hooks/Tickethooks"

type TicketAggregatesProps = {
    filters: {
        [key: string]: string | number | string[] | number[]
    }
}
const TicketAggregates: React.FC<TicketAggregatesProps> = ({filters}) => {

    //get tickets aggregates from server
    const {data: aggregates, isLoading} = useGetTicketAggregates(filters)
    const navigate = useNavigate()

    console.log("Aggregates:: ", aggregates);

    return (<>
    
        <Row gutter={10} style={{width: '100%'}}>
            <Col span={4}>
                <Card variant="borderless" >
                    <Statistic
                        title="Tickets"
                        value={aggregates?.ticket_count}
                        loading={isLoading}
                        valueStyle={{ color: '#3f8600' }}
                    />
                </Card>
            </Col>
            <Col span={4}>
                <Card variant="borderless">
                    <Statistic
                        title="Tickets Revenue"
                        value={aggregates?.total_revenue}
                        precision={2}
                        prefix="GHS"
                        loading={isLoading}
                        valueStyle={{ color: '#3f8600' }}
                    />
                </Card>
            </Col>
            <Col span={4}>
                <Card variant="borderless">
                    <Statistic
                        title="Tickets Unpaid Amount"
                        value={aggregates?.total_unpaid}
                        precision={2}
                        prefix="GHS"
                        loading={isLoading}
                        valueStyle={{ color: '#cf1322' }}
                    />
                </Card>
            </Col>
            <Col span={4}>
                <Card variant="borderless" onClick={() => {
                    navigate("/tickets/unpaid")
                }}>
                    
                    <Statistic
                        title="Unpaid Tickets"
                        value={aggregates?.total_unpaid_tickets}
                        valueStyle={{ color: '#cf1322' }}
                        loading={isLoading}
                    />
                </Card>
            </Col>
            <Col span={4}>
                <Card variant="borderless" onClick={() => {
                   navigate("/agents/summary")
                }}>
                    <Statistic
                        title="Total Agents"
                        value={aggregates?.total_agents}
                        valueStyle={{ color: '#3f8600' }}
                        loading={isLoading}
                    />
                </Card>
            </Col>
        </Row>
    
</>)
}

export default TicketAggregates;