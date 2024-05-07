import { useState } from "react";
import { Rate } from "../../Types/Rate";
import { Button, Popconfirm, Table, Tag, Space, message } from "antd";
import type { TableProps } from 'antd';
import { Station } from "../../Types/Station";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import ModalFormAddEdit from "./ModalFormAddEdit";
import FormAddEdit from "./FormAddEdit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Urls from '../../Constants/Urls';
import { deleteRate } from "../../Services/Rate";

type RatesProps = {
    rates: Rate[],
    isloading: boolean
}

const RatesTable= ({ rates, isloading }: RatesProps) => {
    const [modalOpen, setModalOpen] = useState(false)
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const [initialValues, setInitialValues] = useState<Rate | undefined>(undefined);
    const [stations, _] = useState<Station[]>([...new Set(rates.map(item => JSON.stringify(item.station)))].map(station => JSON.parse(station)));
    const [idToDelete, setIdToDelete] = useState(0);

    const { mutate: deleteRateItem, isPending } = useMutation({
        mutationFn: (id: number) => deleteRate(id),
        onSuccess: (data: any) => { 
            queryClient.invalidateQueries();
            messageApi.success(data.message);
        }
    });

    const handleDeleteConfirm = (rateId: number|undefined) => {
        if (rateId){
            setIdToDelete(rateId)
            deleteRateItem(rateId)
        } else {
            messageApi.error('Error deleting rate');
        }
    }

    const handleRateEdit = (record: Rate) => {
        
        const initialValues = {
            id: record.id,
            title: record.title,
            amount: record.amount,
            station: record.station,
            is_postpaid: false,
            rate_type: record.rate_type
        } as Rate

        setInitialValues(initialValues);

        setModalOpen(true);
        
    }

    const columns: TableProps<Rate>['columns'] = [
        {
            title: 'Vehicle Category',
            dataIndex: 'title',
            key: 'vehicle_category'
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (value: string) => {
            return (value.startsWith('http')) ?
            <img src={value} width='92'/> 
            :
            <img src={`${Urls.RATE_BASE_URL}${value.substring(6) }`} width='92'/>
             }
        },
        {
            title: 'Rate',
            dataIndex: 'amount',
            key: 'rate',
            render: (value: string, record: Rate) => (<Space>
                <strong>{value} GHC</strong>
                <Tag>{ record.rate_type === 'fixed'? 'FIXED':'FLEXIBLE' }</Tag>
                </Space>)
        },
        {
            title: 'Station',
            dataIndex: 'station',
            key: 'station',
            render: (value: Station) => value.name
        },
        {
            title: 'Postpaid',
            dataIndex: 'is_postpaid',
            key: 'postpaid',
            render: (value: string) => ((parseInt(value) === 1) ? <Tag color="gold">Postpaid</Tag> : <Tag color="green">Pay as you go</Tag>)
        },
        {
            title: 'Action',
            dataIndex: 'action', 
            key: 'action',
            render: (_, record: Rate) => <>
             <Space size="middle">
                <Button icon={<EditFilled />} onClick={() => handleRateEdit(record)}>Edit</Button>
                <Popconfirm
                    title="Delete the User"
                    description="Are you sure to delete this Rate?"
                    onConfirm={ () => handleDeleteConfirm(record.id) }
                    onCancel={() =>{}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteFilled />} 
                        loading={(idToDelete === record.id) && isPending}
                    />
                </Popconfirm></Space>
                </>
                
        }
    ]


    return (
        <>
        {contextHolder}
        <ModalFormAddEdit 
            title={"Edit Rate"}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
        >
            <FormAddEdit initialValues={initialValues} stations={ stations } setModalOpen={setModalOpen}/>
        </ModalFormAddEdit>
            
            <Table 
                columns={columns}
                dataSource={rates}
                loading={isloading}
                scroll={{y:500}}
                pagination={false}
            />
        </>
    )

}

export default RatesTable;