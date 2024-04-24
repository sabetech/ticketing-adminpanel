import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Select, InputNumber, Alert, Typography, Button, Space , message} from "antd";
import { getPostPaidRates } from "../../Services/Rate"
import { AppError, RemoteResponse } from "../../Types/Remote";
import { PayOnCreditRequest, Rate } from "../../Types/Rate";
import { Station } from "../../Types/Station";
import { getStations } from '../../Services/Station';
import { Ticket } from "../../Types/Tickets";
import { makePayment } from "../../Services/Rate";
import dayjs from "dayjs";

type FormMakePaymentProps = {
    dateRange: {from:string, to:string} | undefined
    setModalOpen: any
}

const FormMakePayment:React.FC<FormMakePaymentProps> = ( {dateRange, setModalOpen} ) => {
    const [form] = Form.useForm();
    const [selectedStation, setSelectedStation] = useState<number | undefined>(undefined)
    const [selectedClient, setSelectedClient] = useState<{value: number, label: React.ReactNode} | undefined>(undefined)
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    const {data: stations} = useQuery<RemoteResponse<Station[]> | AppError>({
        queryKey: ['stations'],
        queryFn: () => getStations()
    });

    const cachedData: RemoteResponse<Ticket[]> | undefined = queryClient.getQueryData(['thirdpartyticket', dateRange]);
    
    const { mutate } = useMutation({ 
        mutationFn: (values: PayOnCreditRequest) => makePayment(values),
        onSuccess: (data: any) => { 
            messageApi.open({
                type: 'success',
                content: data.message,
            });
        }
    });

    // console.log("DATE RANGE", dateRange);
    // console.log("Cached Data:::", cachedData)

    const {data: thirdPartyCustomers, isFetching} = useQuery<RemoteResponse<Rate[]> | AppError>({
        queryKey: ['thirdpartycustomers', selectedStation],
        queryFn: () => {
            if (typeof selectedStation !== 'undefined')
                return getPostPaidRates(selectedStation)
            return new Promise<AppError>((_, reject) => {
                reject("Station not selected");
            })
        },
        enabled: typeof selectedStation !== 'undefined'
    });

    const onFinish = (values: any) => {
        console.log("VALUESS FROM FORM::", values);
        const {station, client, amount} = values;
        console.log("STataion::", station, ' customer: ', client.value, ' amount: ', amount, ' dateRange:', dateRange)
        const paymentRequest = {
            station_id: station, 
            client_id: client.value,
            amount: amount,
            dateRange: JSON.stringify(dateRange)
        } as PayOnCreditRequest

        mutate(paymentRequest);
        setModalOpen(false);
        
    }

    return (<>
        {contextHolder}
        <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            size="large"
        >
            <Form.Item
                name={'station'}
                label={'Station'}
                rules={[{ required: true, message: 'Please Choose Station!' }]}
            >
                <Select 
                    placeholder="Select Station"
                    options={(stations && stations.success) 
                        ? stations.data.map((station) => ({
                            value: station.id,
                            label: station.name
                        })):[]
                    }
                    onChange={(value) => setSelectedStation(value)}
                />
            </Form.Item>
            <Form.Item
                name={'client'}
                label={'Customer'}
                rules={[{ required: true, message: 'Please Choose Customer!' }]}
            >
                <Select
                    loading={isFetching}
                    disabled={typeof selectedStation === 'undefined' || isFetching}
                    showSearch
                    labelInValue={true}
                    placeholder="Select a third party customer"
                    onChange={(value: { value: number; label: React.ReactNode }) => {
                        console.log("CHANGED VALL::", value)
                        setSelectedClient(value)
                        }
                    }
                    options={
                        (thirdPartyCustomers && thirdPartyCustomers.success) 
                        ? thirdPartyCustomers.data.map((thirdParty: Rate) => ({
                            value: thirdParty.id,
                            label: thirdParty.title
                        })) : []
                    }
                />
            </Form.Item>
            { typeof selectedClient !== 'undefined' &&
            <Alert
                showIcon
                message={<Typography.Paragraph>Amount to be Paid by <strong>{selectedClient.label}</strong> from <strong>{dayjs(dateRange?.from).format("DD MMMM YYYY")} to {dayjs(dateRange?.to).format("DD MMMM YYYY")}</strong></Typography.Paragraph>}
                description={<>
                <Typography.Title level={5}>
                    { (cachedData && cachedData?.success) ? cachedData.data.filter(tkt => (parseInt(tkt.rate_title) === selectedClient.value && tkt.paid == false)).length:0 } x Tickets
                </Typography.Title>
                <Typography.Title level={3}>
                   { (cachedData && cachedData?.success) ? cachedData.data.filter(tkt => parseInt(tkt.rate_title) === selectedClient.value).reduce((acc, tkt: Ticket) => {
                    if (Number(tkt.paid) === 0) {
                        return acc + parseFloat(tkt.amount);
                    } else {
                        return acc;
                    }
                   }, 0): 0 } GHc
                </Typography.Title>
                </>
                }
                type="info"
            />
            }
            <Form.Item
                name={'amount'}
                label={'Amount'}
                rules={[{ required: true, message: 'Please Enter Amount!' }]}
            >
                <InputNumber 
                    placeholder="0.00"
                    addonBefore="GHc"
                />
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button htmlType="submit" type={'primary'}>Submit</Button>
                    <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                </Space>
            </Form.Item>
        </Form>
        
    </>)
}

export default FormMakePayment;