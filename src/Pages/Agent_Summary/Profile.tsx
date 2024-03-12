import { Card, Avatar } from 'antd';
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons';

const { Meta } = Card;
const Profile = () => {

    return (
        <>
            <Card
                style={{ width: 300 }}
                cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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