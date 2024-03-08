import { Card, Typography } from "antd";

type CardProps = {
    title: string,
    content: string
}

const CardInfo = ({title, content}: CardProps ) => {
    return (
        <Card title={title} bordered={true}>
            <Typography.Title level={3} >{content}</Typography.Title>
        </Card>
    )
}

export default CardInfo;