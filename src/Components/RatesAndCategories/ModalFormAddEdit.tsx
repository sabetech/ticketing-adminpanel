import { Modal } from 'antd'

type ModalProps = {
    title: string
    modalOpen: boolean
    children: React.ReactNode
    setModalOpen: any

}

const ModalFormAddEdit = ({title, modalOpen, setModalOpen, children}: ModalProps) => 
    <Modal
        title={title}
        open={modalOpen}
        footer={null}
        closable={true}
        onCancel={() => setModalOpen(false)}
    >
        {children}
    </Modal>

export default ModalFormAddEdit