import { useEffect, useState } from "react";
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

const { Text } = Typography;

const FormMakePayment:React.FC<FormMakePaymentProps> = ( {dateRange, setModalOpen} ) => {
    const [form] = Form.useForm();
    const [selectedStation, setSelectedStation] = useState<number | undefined>(undefined)
    const [selectedClient, setSelectedClient] = useState<{value: number, label: React.ReactNode} | undefined>(undefined)
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const [discount, setDiscount] = useState(0);
    const [withholdingTax, setwithholdingTax] = useState(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0)

    const {data: stations} = useQuery<RemoteResponse<Station[]> | AppError>({
        queryKey: ['stations'],
        queryFn: () => getStations()
    });

    const cachedData: RemoteResponse<Ticket[]> | undefined = queryClient.getQueryData(['thirdpartyticket', dateRange]);

    useEffect(() => {
        if (typeof selectedClient !== 'undefined') {
            
            setTotalAmount((cachedData && cachedData?.success) ? cachedData.data.filter(tkt => Number(tkt.rate_id) === selectedClient.value).reduce((acc, tkt: Ticket) => {
                
                if (Number(tkt.paid) === 0) {
                    return acc + parseFloat(tkt.amount);
                } else {
                    return acc;
                }
               }, 0): 0)
        }
    },[selectedClient])

    useEffect(() => {

        setTotalAmount(discount > 0 || withholdingTax > 0 ? totalAmount - ((totalAmount * (discount / 100)) + (totalAmount * (withholdingTax / 100))): totalAmount)

    }, [discount, withholdingTax]);
    
    
    const { mutate } = useMutation({ 
        mutationFn: (values: PayOnCreditRequest) => makePayment(values),
        onSuccess: (data: any) => { 
            console.log("response from server:, ", data);
            
            queryClient.invalidateQueries({queryKey:['thirdpartyticket', dateRange]});

            messageApi.open({
                type: 'success',
                content: "Payment made successfully",
            });
        }
    });

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
        console.log("Values::", values);
        const {station, client, amount, withholding_tax, discount} = values;
        
        if (typeof station === 'undefined' || 
            typeof client === 'undefined' || 
            typeof amount === 'undefined') {

            messageApi.open({
                type: 'error',
                content: 'Please fill all fields',
            });

            return;
        }

        const paymentRequest = {
            station_id: station, 
            client_id: client.value,
            amount: amount,
            dateRange: JSON.stringify(dateRange),
            withholding_tax: withholding_tax,
            discount: discount
        } as PayOnCreditRequest

        messageApi.open({
            type: 'loading',
            content: 'Making Payment',
        });

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
                    { (cachedData && cachedData?.success) ? cachedData.data.filter(tkt => (Number(tkt.rate_id) === selectedClient.value && tkt.paid == false)).length : 0 } x {cachedData.data.length > 0 ? cachedData.data[0]?.amount : 0 } Tickets
                    {
                    discount > 0 && ` (${discount} % discount)`
                    }
                    {
                    withholdingTax > 0 && ` (${withholdingTax} % withholding tax)`
                    }
                </Typography.Title>
                
                <Typography.Title level={3}>
                  { totalAmount.toFixed(2) } GHc
                </Typography.Title>
                </>
                }
                type="info"
            />
            }

            <Form.Item
                name={'discount'}
                label={'Discount'}
                rules={[{ required: false}]}
            >
                <InputNumber 
                    placeholder="10"
                    addonAfter="%"
                    disabled={typeof selectedClient === 'undefined' || isFetching}
                    value={discount}
                    onChange={(value) => setDiscount(value)}
                />
            </Form.Item>

            <Form.Item
                name={'withholding_tax'}
                label={'Witholding Tax'}
                rules={[{ required: false }]}
            >
                <InputNumber 
                    placeholder="10"
                    addonAfter="%"
                    disabled={typeof selectedClient === 'undefined' || isFetching}
                    value={withholdingTax}
                    onChange={(value) => setwithholdingTax(value)}
                />
            </Form.Item>

            <Form.Item
                name={'amount'}
                label={'Amount'}
                rules={[{ required: true, message: 'Please Enter Amount!' }]}
            >
                <InputNumber 
                    placeholder="0.00"
                    addonBefore="GHc"
                    disabled={typeof selectedClient === 'undefined' || isFetching}
                    onChange={(value) => setAmount(Number(value))}
                />
            </Form.Item>

            <Form.Item>
                <div style={{marginBottom: 10}}><Text keyboard>Amount to be paid: { totalAmount.toFixed(2) } GHc</Text></div>
                <Space>
                    <Button htmlType="submit" type={'primary'} disabled={(typeof selectedClient === 'undefined' || isFetching) || amount < totalAmount}>Submit</Button>
                    <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                </Space>
            </Form.Item>
        </Form>
        
    </>)
}

export default FormMakePayment;