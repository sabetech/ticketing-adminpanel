import { useEffect, useState } from 'react';
import {Row, Col, Card} from 'antd';
import TableAgentsOnline from '../../Components/Dashboard/TableAgentsOnline';
import TableAgentsTickets from '../../Components/Dashboard/TableAgentsTickets';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import CardInfo from '../../Components/Dashboard/CardInfo';
import { useQuery } from '@tanstack/react-query';
import { getTicketCount, getTicketRevenue, getUnpaidAmount } from '../../Services/TicketService'
import { getAgentCount, getAgentOnlineStatus } from '../../Services/AgentService';

import dayjs from 'dayjs';
import { AppError, RemoteResponse } from '../../Types/Remote';



const Dashboard = () => {
    const [ticketCount, setTicketCount] = useState<number>(0);
    const [ticketRevenue, setTicketRevenue] = useState<number>(0);
    const [unpaidTicketsAmount, setUnpaidTicketsAmount] = useState<number>(0);
    const [agentCount, setAgentCount] = useState<number>(0);
    const now = dayjs().format("YYYY-MM-DD");
    const [date, setDate] = useState<string>(now)
    

    const { data: ticketsNumber, isLoading: isTicketCountLoading } = useQuery<RemoteResponse<number> | AppError>({
      queryKey: ['ticketsCount', date],
      queryFn: async () => getTicketCount(date)
    });

    const { data: ticketsRevenueData, isLoading: isTicketRevenueLoading } = useQuery<RemoteResponse<number> | AppError>({
      queryKey: ['ticketsRevenue', date],
      queryFn: async () => getTicketRevenue(date)
    });

    const { data: ticketsUnpaidAmountData, isLoading: isTicketUnpaidAmountLoading } = useQuery<RemoteResponse<number> | AppError>({
      queryKey: ['ticketsUnpaidAmount', date],
      queryFn: async () => getUnpaidAmount(date)
    });

    const { data: agentsDataCount, isLoading: isAgentsCountLoading } = useQuery<RemoteResponse<number> | AppError>({
      queryKey: ['agentCount', date],
      queryFn: async () => getAgentCount(date)
    });

    const { data: agentsOnline, isLoading: isAgentsOnlineLoading } = useQuery(
      {
        queryKey: ['agentCount'],
        queryFn: async () => getAgentOnlineStatus()
      })


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
    
    const onChange: DatePickerProps['onChange'] = (_, dateString) => {
      if (typeof dateString == 'string') setDate(dateString)
    };
    
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
            <Card title="Top 5 Agents Tickets On { Date }">
              <TableAgentsTickets />
            </Card>
          </Col>
          <Col span={11}>
            <Card title="Agent Online Status">
              <TableAgentsOnline agentsOnline={agentsOnline} />
            </Card>
          </Col>
        </Row>
      </>
    );
}

export default Dashboard;