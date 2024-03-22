import { useEffect, useState } from 'react';
import {Row, Col, Card} from 'antd';
import TableAgentsOnline from '../../Components/Dashboard/TableAgentsOnline';
import TableAgentsTickets from '../../Components/Dashboard/TableAgentsTickets';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import CardInfo from '../../Components/Dashboard/CardInfo';
import { useQuery } from '@tanstack/react-query';
import { getTicketCount, getTicketRevenue, getUnpaidAmount } from '../../Services/TicketService'
import { getAgentCount } from '../../Services/AgentService';
import { Ticket } from '../../Types/Tickets';
import dayjs from 'dayjs';
import { AppError, RemoteResponse } from '../../Types/Remote';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const Dashboard = () => {
    const [ticketCount, setTicketCount] = useState<number>(0);
    const [ticketRevenue, setTicketRevenue] = useState<number>(0);
    const [unpaidTicketsAmount, setUnpaidTicketsAmount] = useState<number>(0);
    const [agentCount, setAgentCount] = useState<number>(0);

    const now = dayjs().format("YYYY-MM-DD");

    //Get Ticket Count
    // const { data, isLoading } = useQuery<RemoteResponse<Ticket[]> | AppError>({
    //   queryKey: ['ticketsIssued'],
    //   queryFn: async () => getTicketsIssued(now)
    // });
    //Get Ticket Count

    const { data: ticketsNumber, isLoading: isTicketCountLoading } = useQuery<RemoteResponse<number> | AppError>({
      queryKey: ['ticketsCount'],
      queryFn: async () => getTicketCount(now)
    });

    const { data: ticketsRevenueData, isLoading: isTicketRevenueLoading } = useQuery<RemoteResponse<number> | AppError>({
      queryKey: ['ticketsRevenue'],
      queryFn: async () => getTicketRevenue(now)
    });

    const { data: ticketsUnpaidAmountData, isLoading: isTicketUnpaidAmountLoading } = useQuery<RemoteResponse<number> | AppError>({
      queryKey: ['ticketsUnpaidAmount'],
      queryFn: async () => getUnpaidAmount(now)
    });

    const { data: agentsDataCount, isLoading: isAgentsCountLoading } = useQuery<RemoteResponse<number> | AppError>({
      queryKey: ['agentCount'],
      queryFn: async () => getAgentCount(now)
    });

    useEffect(() => {
      if (ticketsNumber?.success) {
        setTicketCount(ticketsNumber.data);
      }
      
      if (ticketsRevenueData?.success) {
        setTicketRevenue(ticketsRevenueData.data);
      }

      if (ticketsUnpaidAmountData?.success) {
        setUnpaidTicketsAmount(ticketsUnpaidAmountData.data);
      }

      if (agentsDataCount?.success) {
        setAgentCount(agentsDataCount.data);
      }


      
    }, [ticketsNumber, ticketsRevenueData, ticketsUnpaidAmountData, agentsDataCount]);
    
    
    return (
        <>
        <Row style={{marginBottom: 20}} >
            <DatePicker onChange={onChange} size={'large'} defaultValue={dayjs()}/>
        </Row>
        <Row gutter={12}>
            <Col span={6}>
              <CardInfo title="Tickets Issued" content={ ticketCount.toString() } loading={isTicketCountLoading} />
            </Col>
            <Col span={6}>
              <CardInfo title="Revenue" content={`GHS ${ticketRevenue}`} loading={isTicketRevenueLoading}/>
            </Col>
            <Col span={6}>
              <CardInfo title="Unpaid" content={`GHS ${unpaidTicketsAmount}`} loading={isTicketUnpaidAmountLoading}/>
            </Col>
            <Col span={6}>
              <CardInfo title="Number of Agents" content={ agentCount.toString() } loading={isAgentsCountLoading} />
            </Col>
        </Row>
        <Row gutter={12} style={{marginTop: 50}}>
          <Col span={11}>
            <Card title="Top 5 Tickets On { Date }">
              <TableAgentsTickets />
            </Card>
          </Col>
          <Col span={11}>
            <Card title="Agent Online Status">
              <TableAgentsOnline />
            </Card>
          </Col>
        </Row>
      </>
    );
}

export default Dashboard;