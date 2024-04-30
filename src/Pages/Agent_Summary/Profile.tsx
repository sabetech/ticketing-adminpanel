import { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Space, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAgentDetail } from '../../Services/AgentService';
import { useNavigate } from 'react-router-dom';
import { TAgentTicketInfo } from '../../Types/Agent';
import { DatePicker } from "antd";
import type { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import AgentTickets from '../../Components/Agents/AgentTickets';
import * as urls from '../../Constants/Urls';

const { RangePicker } = DatePicker;

const { Meta } = Card;
const Profile = () => {
    const [agentTicketInfo, setAgentTicketInfo] = useState<TAgentTicketInfo>();
    const [dateRange, setDateRange] = useState<{from:string, to:string} | undefined>(undefined);
    const [imageLoaded, setImageLoaded] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const { data: agentTicketInfoData, isSuccess, isRefetching } = useQuery({
        queryKey: ['agentsTicketInfoData', dateRange],
        queryFn: async () => getAgentDetail(id, dateRange)
    });

    useEffect(() => {

        if (isSuccess && agentTicketInfoData.success) {
            setAgentTicketInfo(agentTicketInfoData.data);
        }

    },[agentTicketInfoData]);

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs()] },
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
      ];
      
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setDateRange({from: dateStrings[0], to: dateStrings[1]});
        }
    };
    // <ReactImageAppear 
                            //     src={agentTicketInfo?.agent.photo.includes('unknown') ? 'https://img.icons8.com/ios-filled/50/gender-neutral-user.png' : `${urls.IMAGE_BASE_URL}${agentTicketInfo?.agent.photo.substring(19)}`}
                            //     animation="zoomIn"
                            //     animationDuration="1s"
                            // />
      
    return (
        <>
        <Button icon={<ArrowLeftOutlined />} size={'large'} 
            style={{display:'block', marginBottom: 10}} onClick={() => navigate(-1)}>Back</Button>
            <div style={{display: "flex"}}>
                <Space direction={"horizontal"} align="start">
                    <Card
                        loading={isRefetching}
                        hoverable
                        style={{ width: 240, marginRight: 50 }}
                        cover={<img onLoad={() => setImageLoaded(true)} style={imageLoaded ? {} : {display: 'none'}} src={agentTicketInfo?.agent.photo.includes('unknown') ? 'https://img.icons8.com/ios-filled/50/gender-neutral-user.png' : `${urls.IMAGE_BASE_URL}${agentTicketInfo?.agent.photo.substring(19)}`}/>}
                    >
                        <Meta title={agentTicketInfo?.agent.fname + " "+agentTicketInfo?.agent.lname} description={agentTicketInfo?.agent?.station_user.station.name ?? "No Station"} />
                    </Card>

                    <Space direction={"vertical"} align={'start'}>
                        <RangePicker
                            size={"large"}
                            presets={[
                                {
                                label: <span aria-label="Start of Day to Now">Start of Day ~ Now</span>,
                                value: () => [dayjs().startOf('day'), dayjs()],
                                },
                                ...rangePresets,
                            ]}
                            defaultValue={[dayjs().startOf('day'), dayjs()]}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={onRangeChange}
                        />
                        <Row gutter={16} style={{marginTop: 20, width: '100vh'}}>
                            
                            <Col style={{marginRight: '10%'}}>
                                <Statistic title="Tickets" value={agentTicketInfo?.tickets.length ?? 0} />
                            </Col>
                            
                            <Col >
                                <Statistic title="Amount" value={agentTicketInfo?.tickets.reduce((acc, tkt) => acc + parseFloat(tkt.amount), 0)} suffix="GHC" />
                            </Col>
                            
                        </Row>
                        <Space>{
                            agentTicketInfo?.tickets &&
                                <AgentTickets agentTickets={agentTicketInfo?.tickets} />
                            }
                        </Space>
                    </Space>
                    
                </Space>
                <Space>
                    
                </Space>
            </div>
            
        </>
    )
}

export default Profile;