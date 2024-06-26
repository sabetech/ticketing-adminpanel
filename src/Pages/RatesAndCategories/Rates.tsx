import { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Typography, Space, Button, message, AutoComplete } from 'antd';
import RatesTable from '../../Components/RatesAndCategories/RatesTable';
import { useQuery } from '@tanstack/react-query';
import { getRates } from '../../Services/Rate';
import { AppError, RemoteResponse } from '../../Types/Remote';
import { Rate } from '../../Types/Rate';
import { Station } from '../../Types/Station';
import FormAddEdit from '../../Components/RatesAndCategories/FormAddEdit';
import ModalFormAddEdit from '../../Components/RatesAndCategories/ModalFormAddEdit';

const Rates = () => {
    const [stationSelect, setStationSelect] = useState<number|null>(null)
    const [rates, setRates] = useState<Rate[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const [stations, setStations] = useState<Station[]>([]);
    // const [autocompletOptions, setAutocompleteOptions] = useState<{
    //     key: string,
    //     label: JSX.Element, 
    //     value: string
    // }[]>();

    const { data:ratesData, isLoading, isSuccess, isError } = useQuery<RemoteResponse<Rate[]> | AppError>({
        queryKey: ['rates', stationSelect],
        queryFn: async () => getRates(stationSelect)
    })

    useEffect(() => {
        if (isSuccess && ratesData.success) {
            setRates(ratesData.data);
            setStations([...new Set(ratesData.data.map(item => JSON.stringify(item.station)))].map(station => JSON.parse(station)));
        }
    },[ratesData])

    if (isError) {
        messageApi.open({
            type: 'error',
            content: 'Could not load Rates. Check your internet connection',
          });
    }
    
    const handleChange = (value: number) => {
        setStationSelect(value)
    };

    // const handleOk = (values: any) => {
    //     console.log("VALUE FROM FOFM MODAL::", values)
    // }
    const onSearchClear = () => {
        if (isSuccess && ratesData.success) setRates(ratesData.data);
    }

    const onsearchselect = (data: string) => {
        const selectedRate = rates.filter(rt => rt.title === data);
        setRates(selectedRate)
    };

    return (
    <>
    {contextHolder}
        <ModalFormAddEdit 
            title={"Add New Rate"}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
        >
            <FormAddEdit initialValues={undefined} stations={stations} setModalOpen={setModalOpen} />
        </ModalFormAddEdit>
            <Row>
                <Col span={23}>
                    <Card title={"Rates"} style={{textAlign: 'left'}}>
                        <Space direction="horizontal" size={'large'} style={{display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start'}}>
                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Select Station</Typography>
                                <Select
                                    defaultValue={null}
                                    style={{ width: 250 }}
                                    size='large'
                                    onChange={handleChange}
                                    options={[
                                        { value: null, label: 'All' },
                                        ...stations.map(stn => ({value: stn.id, label: stn.name}))
                                    ]}
                                />
                            </Space>
                            
                            <Space direction="vertical" style={{textAlign: 'left'}}>
                                <Typography>Search</Typography>
                                    <AutoComplete 
                                        allowClear
                                        onClear={onSearchClear}
                                        options={rates.map( rate => ({
                                            key: rate.id,
                                            label: `${rate.title} (${typeof rate.station === 'object' ? rate.station.name : ""})`,
                                            value: rate.title,
                                        }))}
                                        style={{ width: 500 }}
                                        size="large"
                                        filterOption={(inputValue, option) => 
                                            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        placeholder="Search Rates" 
                                        onSelect={(text: string, _: any) => onsearchselect(text)}
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