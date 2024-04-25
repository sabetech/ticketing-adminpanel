import { Modal } from "antd";
import FormAddUsers from "./FormAddUsers";

type ModalAddUsersProps = {
    open: boolean
    setModalOpen: any
}

const ModalAddUsers: React.FC<ModalAddUsersProps> = ({open, setModalOpen}) => {

    return (
    <Modal
        width={'45vw'}
        title={"Add User"}
        footer={null}
        open={open}
        onCancel={() => setModalOpen(false)}
        closable={true}
    >
        <FormAddUsers setModalOpen={setModalOpen}/>
    </Modal>)
}

export default ModalAddUsers;