import { Modal, ModalBody } from "@ui/modal";
import RegisterForm from "../forms/register-form";

type TProps = {
    show: boolean;
    onClose: () => void;
};

const RegisterModal = ({ show, onClose }: TProps) => {
    return (
        <Modal show={show} onClose={onClose}>
            <ModalBody className="tw-p-14 tw-text-center">
                <RegisterForm />
            </ModalBody>
        </Modal>
    );
};

export default RegisterModal;
