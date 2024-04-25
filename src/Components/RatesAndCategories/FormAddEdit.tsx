import { useMutation } from '@tanstack/react-query';
import { Select, Form, Input, InputNumber, Space, Checkbox, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addRate, editRate } from '../../Services/Rate'
import { Rate } from '../../Types/Rate';
import { Station } from '../../Types/Station';

type formProps = {
    initialValues: Rate | undefined,
    stations: Station[],
    setModalOpen: any
}

const FormAddEdit = ({initialValues, stations, setModalOpen}: formProps) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [messageApi, contextHolder] = message.useMessage();

    form.setFieldsValue(initialValues)

    // const { mutate: deleteRateItem } = useMutation({
    //     mutationFn: (id: number) => deleteRate(id),
    //     onSuccess: (data: any) => { 
    //         console.log("rate mod ON SUCCESS:::", data)
    //     }
    // });

    const { mutate: addOrEditRateItem, isPending } = useMutation({
        mutationFn: (rateValues: {values: Rate, action: string}) => {
            if (rateValues.action === 'add' || typeof rateValues.values.id === 'undefined') {
                return addRate(rateValues.values)
            }
            return editRate(rateValues.values, rateValues.values.id)
        },
        onSuccess: (data: any) => { 
            
            setModalOpen(false)
            messageApi.open({
                type: 'success',
                content: data.message,
              });
        }
    })

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

    const onFinish = (formValues: Rate) => {

        const rateValues = {
            values: {
                id: formValues.id,
                title: formValues.title,
                amount: formValues.amount,
                is_postpaid: typeof formValues.is_postpaid === 'undefined' ? false : true,
                rate_type: typeof formValues.rate_type === 'undefined' ? 'fixed' : 'flexible',
                rate_image: formValues.rate_image[0].originFileObj,
                station: formValues.station,
            } as Rate,
            action: typeof formValues.id !== 'undefined'? 'add':'edit'
            }
        
        addOrEditRateItem(rateValues);
        
    }
      

    return (
        <>
        {contextHolder}
        <Form size='large' onFinish={onFinish} layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
            <Form.Item hidden={true} name={'id'}/>
            <Form.Item
                name="title"
                label="Rate Category"
                rules={[{ required: true, message: 'Please input category!' }]}
            >
                <Input />
            </Form.Item>
            <Space direction={"horizontal"}>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please input Amount!' }]}
                >
                    <InputNumber prefix="GHc" style={{ width: '90%' }} />
                </Form.Item>
                <Form.Item label="Fixed Or Flexible" name="rate_type" valuePropName="checked">
                    <Checkbox>Flexible</Checkbox>
                </Form.Item>
            </Space>
            <Form.Item name="is_postpaid" valuePropName="checked">
                <Checkbox>Postpaid Rate</Checkbox>
            </Form.Item>

            <Form.Item label="Upload" valuePropName="fileList" name="rate_image" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload image!' }]}>
                <Upload listType="picture-card">
                    <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
              </Upload>
            </Form.Item>

            <Form.Item
                name="station"
                label="Station"
                rules={[{ required: true, message: 'Please select Station!' }]}
            >
                <Select placeholder="Select Station" disabled={typeof initialValues !== 'undefined'}>
                    {
                        stations.map(stn => (
                            <Option value={stn.id}>{stn.name}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isPending}>
                    Submit
                </Button>
                <Button style={{marginLeft: 10}} onClick={() => setModalOpen(false)}>
                    cancel
                </Button>
            </Form.Item>
        </Form>
    </>
    );
}

export default FormAddEdit; 