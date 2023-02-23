import { useState } from "react";
import { useUser } from "@contexts/user-context";
import RegisterModal from "@components/modals/register-modal";
import Button from "@ui/button";

const CtaAction = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useUser();

    return (
        <>
            <RegisterModal
                show={modalOpen && !user?.token}
                onClose={() => setModalOpen(false)}
            />
            <Button
                path={user?.token && "/courses"}
                onClick={user?.token ? undefined : () => setModalOpen(true)}
                className="tw-w-[300px]"
            >
                {user?.token
                    ? "Ver cursos recomendados"
                    : "Inscreva-se agora mesmo!"}
            </Button>
        </>
    );
};

export default CtaAction;
