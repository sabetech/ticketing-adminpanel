import { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAgentDetail } from '../../Services/AgentService';
import { TAgentTicketInfo } from '../../Types/Agent';


const { Meta } = Card;
const Profile = () => {
    const [agentTicketInfo, setAgentTicketInfo] = useState<TAgentTicketInfo>();

    const { id } = useParams();

    const { data: agentTicketInfoData, isSuccess } = useQuery({
        queryKey: ['agentsTicketInfoData'],
        queryFn: async () => getAgentDetail(id)
    });

    useEffect(() => {

        if (isSuccess) {
            setAgentTicketInfo(agentTicketInfo);
        }

    },[agentTicketInfoData])

    console.log("Agent Ticket Info Data::",agentTicketInfo);
    
    return (
        <>
            <Card
                style={{ width: 300 }}
                cover={
                <img
                    alt="agent-photo"
                    src={`https://tickets.koajay.com/assets/${agentTicketInfo?.agent.photo}`}
                />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Agent Name"
                    description="Achimota Station"
                />
            </Card>
        </>
    )
}

export default Profile;