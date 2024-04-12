import { useState } from "react";
import { Rate } from "../../Types/Rate";
import { Button, Popconfirm, Table, Tag, Space, Modal } from "antd";
import type { TableProps } from 'antd';
import { Station } from "../../Types/Station";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import ModalFormAddEdit from "./ModalFormAddEdit";
import FormAddEdit from "./FormAddEdit";

type RatesProps = {
    rates: Rate[],
    isloading: boolean
}

const RatesTable= ({ rates, isloading }: RatesProps) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [confirmLoading, setConfirmingLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<object | undefined>(undefined);

    const handleDeleteClick = () => {
        
    }

    const handleDeleteConfirm = () => {

    }

    const handleRateEdit = (record: Rate) => {
        //show the edit modal here ...
        const initialValues= {
            category: record.title,
            amount: record.amount,
            station: record.station.name,
            flexible: false,
            postpaid: false
        }

        setInitialValues(initialValues);

        setModalOpen(true);
        
    }

    const handleOk = () => {

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
            render: (value: string) => <img src={value} width='92'/>
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
                <Button icon={<EditFilled />} onClick={() => handleRateEdit(record)}>Edit</Button>
                <Popconfirm
                    title="Delete the User"
                    description="Are you sure to delete this User?"
                    onConfirm={ () => handleDeleteConfirm() }
                    onCancel={() =>{}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="text" danger icon={<DeleteFilled />} onClick={() => handleDeleteClick()}/>
                </Popconfirm></>
                
        }
    ]


    return (
        <>
        <ModalFormAddEdit 
            title={"Edit Rate"}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleOk={handleOk}
            confirmLoading={confirmLoading}
        >
            <FormAddEdit initialValues={initialValues}/>
        </ModalFormAddEdit>
            
            <Table 
                columns={columns}
                dataSource={rates}
                loading={isloading}
                scroll={{y:500}}
            />
        </>
    )

}

export default RatesTable;