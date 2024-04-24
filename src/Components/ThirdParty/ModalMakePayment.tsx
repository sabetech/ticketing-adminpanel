import { Modal } from "antd";
import FormMakePayment from '../../Components/ThirdParty/FormMakePayment'

type ModalMakePaymentProps = {
    open: boolean
    dateRange: {from:string, to:string} | undefined
    setModalOpen: any
}

const ModalMakePayment:React.FC<ModalMakePaymentProps> = ({open, dateRange, setModalOpen}) => {

    console.log("MODALL::", dateRange);

    return( 
    <>
        <Modal
            title="Make Payment"
            open={open}
            closable={true}
            onCancel={() => setModalOpen(false)}
            footer={false}
        >
            <FormMakePayment dateRange={dateRange} setModalOpen={setModalOpen}/>
        </Modal>
    </>);
}

export default ModalMakePayment;