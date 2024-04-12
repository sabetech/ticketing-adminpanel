import { Modal } from 'antd'

type ModalProps = {
    title: string
    modalOpen: boolean
    setModalOpen: (value: boolean) => void
    handleOk: () => void
    confirmLoading: boolean
    children: React.ReactNode

}

const ModalFormAddEdit = ({title, modalOpen, setModalOpen, handleOk, confirmLoading, children}: ModalProps) => 
    <Modal
        title={title}
        open={modalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setModalOpen(false)}
    >
        {children}
        {/* <FormAddEdit title={""} initialValues={undefined} /> */}
    </Modal>

export default ModalFormAddEdit