import {Row, Col, Card} from 'antd';
import TableAgentsOnline from '../../Components/Dashboard/TableAgentsOnline';
import TableAgentsTickets from '../../Components/Dashboard/TableAgentsTickets';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import CardInfo from '../../Components/Dashboard/CardInfo';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const Dashboard = () => {

    

    return (
        <>
        <Row style={{marginBottom: 20}} >
            <DatePicker onChange={onChange} size={'large'} />
        </Row>
        <Row gutter={12}>
              <Col span={6}>
                <CardInfo title="Tickets Issued" content={'21012'} />
              </Col>
              <Col span={6}>
                <CardInfo title="Revenue" content={'GHS 109,302'} />
              </Col>
              <Col span={6}>
                <CardInfo title="Number of Agents" content={'7'} />
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