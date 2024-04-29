import { Space } from "antd";
import { Agent } from "../../Types/Agent";
import * as urls from '../../Constants/Urls';
// import ProgressiveImage from 'react-progressive-graceful-image'
import { UserCard } from 'react-ui-cards';

type TableAgentProp = {
    agents: Agent[],
    isLoading: boolean
}

const AgentListCard: React.FC<TableAgentProp> = ({ agents }) => {
    return (<>
    <Space size={[5, 16]} wrap>
        {
            agents.map(agt => 
                <UserCard
                    float
                    href={`agent-summary/${agt.id}/detail`}
                    header={agt.photo.includes('unknown') ? 'https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg' : `${urls.IMAGE_BASE_URL}${agt.photo.substring(19)}`}
                    avatar={``}
                    name={agt.fname+ " "+agt.lname}
                    positionName={agt?.stationInfo?.name ?? "No Station"}
                    stats={[
                        {
                            name: 'Tickets',
                            value: "TBD"
                        },
                        {
                            name: 'Amount',
                            value: "TBD"
                        }
                    ]}
                />
                )
        }        
        </Space>
    </>)
}

export default AgentListCard;

/*

<Card
                loading={isLoading}
                hoverable
                style={{ width: '24' }}
                cover={
                <ProgressiveImage src={agt.photo.includes('unknown') ? 'https://img.icons8.com/ios-filled/50/gender-neutral-user.png' : `${urls.IMAGE_BASE_URL}${agt.photo.substring(19)}`} placeholder="tiny-image.jpg" >
                     {(src, loading) => (
                        <img alt="example" style={{marginRight: 10, opacity: loading ? 0.5 : 1}} src={src} />
                     )}
                </ProgressiveImage>}
              >
                <Card.Meta title={agt.fname+ " "+agt.lname} description={agt?.stationInfo?.name ?? "No Station"} />
              </Card>

*/