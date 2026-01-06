import { Card, Typography } from "antd";

const CustomCard = ({title, value}) => {
    return (
        <Card className="custom-card">
            <Card.Meta title={title} />
            <Card.Meta description={<Typography.Title level={3}>{value}</Typography.Title>} />
        </Card>
    );
};

export default CustomCard;
