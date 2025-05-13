import { usePaymentHistory } from "../../hooks/RateHooks";
import { Table } from "antd";
import { Rate } from "../../Types/Rate";
import { formatDate } from "../../Utils/Helpers";


type TicketAggregatesProps = {
    dateRange: {from:string, to:string} | undefined
}
const PaymentHistoryTable:React.FC<TicketAggregatesProps> = ({dateRange}) => {

    const { data: paymentHistory, isLoading} = usePaymentHistory(dateRange)
    console.log("Payment History: ", paymentHistory);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer: Rate) => {
                return (
                    <span>{customer?.title}</span>
                )
            }
        },
        {
            title: 'Amount Paid',
            dataIndex: 'amount_paid',
            key: 'amount_paid',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Tax',
            dataIndex: 'witholding_tax',
            key: 'tax',
        },
        {
            title: 'Period',
            key: 'period',
            render: (_: any, record: any) => {
                return (
                    <span>{ formatDate(record?.start_date) }  -  {formatDate(record?.end_date) }</span>
                )
            }
        }
    ]


    return (
        <>
            <Table 
                columns={columns}
                dataSource={paymentHistory}
                pagination={false}
                rowKey="id"
                style={{width: '100%'}}
                scroll={{ x: 'max-content' }}
                loading={isLoading}
            />
        </>
    )
}

export default PaymentHistoryTable;