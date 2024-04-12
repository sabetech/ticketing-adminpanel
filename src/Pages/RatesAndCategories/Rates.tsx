import { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Typography, Space, Button, Modal } from 'antd';
import RatesTable from '../../Components/RatesAndCategories/RatesTable';
import { useQuery } from '@tanstack/react-query';
import { getRates } from '../../Services/Rate';
import { AppError, RemoteResponse } from '../../Types/Remote';
import { Rate } from '../../Types/Rate';
import FormAddEdit from '../../Components/RatesAndCategories/FormAddEdit';
import ModalFormAddEdit from '../../Components/RatesAndCategories/ModalFormAddEdit';

const Rates = () => {
    const [stationSelect, setStationSelect] = useState<number|null>(null)
    const [rates, setRates] = useState<Rate[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [confirmLoading, setConfirmingLoading] = useState(false);

    const { data:ratesData, isLoading, isSuccess } = useQuery<RemoteResponse<Rate[]> | AppError>({
        queryKey: ['rates', stationSelect],
        queryFn: async () => getRates(stationSelect)
    })

    useEffect(() => {
        if (isSuccess && ratesData.success) {
            setRates(ratesData.data);
        }
    },[ratesData])
    
    const handleChange = (value: number) => {
        setStationSelect(value)
    };

    const handleOk = () => {

    }

    return (
    <>
        <ModalFormAddEdit 
            title={"Add New Rate"}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleOk={handleOk}
            confirmLoading={confirmLoading}
        >
            <FormAddEdit initialValues={undefined}/>
        </ModalFormAddEdit>
            <Row>
                <Col span={23}>
                    <Card title={"Rates"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Select Station</Typography>
                                <Select
                                    defaultValue={null}
                                    style={{ width: 120 }}
                                    size='large'
                                    onChange={handleChange}
                                    options={[
                                        { value: null, label: 'All' },
                                        { value: 1, label: 'Achimota' },
                                        { value: 2, label: 'Circle' },
                                    ]}
                                />
                            </Space>
                            <Button type={'primary'} size={'large'} style={{float: 'right'}} onClick={() => setModalOpen(true)}>Add New Rate</Button>
                        </Space>
                        
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={23}>
                    <RatesTable rates={rates} isloading={isLoading} />
                </Col>
            </Row>
        </>
    )
};

export default Rates;