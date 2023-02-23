import { Modal, ModalBody } from "@ui/modal";
import LoginForm from "../forms/login-form";

type TProps = {
    show: boolean;
    onClose: () => void;
};

const LoginModal = ({ show, onClose }: TProps) => {
    return (
        <Modal show={show} onClose={onClose}>
            <ModalBody className="tw-p-14 tw-text-center">
                <LoginForm onClose={onClose} />
            </ModalBody>
        </Modal>
    );
};

export default LoginModal;
