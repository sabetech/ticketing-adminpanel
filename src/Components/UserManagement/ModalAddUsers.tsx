import { Modal } from "antd";
import FormAddUsers from "./FormAddUsers";

type ModalAddUsersProps = {
    open: boolean
    setModalOpen: any
}

const ModalAddUsers: React.FC<ModalAddUsersProps> = ({open, setModalOpen}) => {

    return (
    <Modal
        width={'35vw'}
        title={"Add User"}
        open={open}
        onCancel={() => setModalOpen(false)}
        closable={true}
    >
        <FormAddUsers />
    </Modal>)
}

export default ModalAddUsers;