import { Card, Typography } from "antd";

type CardProps = {
    title: string,
    content: string,
    loading: boolean
}

const CardInfo = ({title, content, loading}: CardProps ) => {
    return (
        <Card title={title} bordered={true} loading={loading}>
            <Typography.Title level={3} >{content}</Typography.Title>
        </Card>
    )
}

export default CardInfo;