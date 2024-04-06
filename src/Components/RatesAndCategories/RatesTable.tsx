import { Rate } from "../../Types/Rate";
import { Table } from "antd";
import type { TableProps } from 'antd';
import { Station } from "../../Types/Station";

type RatesProps = {
    rates: Rate[],
    isloading: boolean

}

const RatesTable= ({ rates, isloading }: RatesProps) => {

    type RateProps = {
        
    }

    const columns: TableProps<RateProps>['columns'] = [
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
            key: 'rate'
        },
        {
            title: 'Station',
            dataIndex: 'station',
            key: 'station',
            render: (value: Station) => value.name
        },
        {
            title: 'Pay as you Go',
            dataIndex: 'is_postpaid',
            key: 'pay_as_you_go',
            render: (value: string) => ((parseInt(value) === 0) ? "Yes" : "NO")
        },
        {
            title: 'Action',
            dataIndex: 'action', 
            key: 'action'
        }
    ]


    return (
        <>
            <Table 
                columns={columns}
                dataSource={rates}
                loading={isloading}
            />
        </>
    )

}

export default RatesTable;