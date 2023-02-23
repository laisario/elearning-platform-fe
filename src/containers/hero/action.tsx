import RegisterModal from "@components/modals/register-modal";
import LoginModal from "@components/modals/login-modal";
import Button from "@ui/button";
import MottoText from "@ui/motto-text";

import { useState } from "react";
import { useUser } from "@contexts/user-context";

const HeroAction = () => {
    const [modalOpen, setModalOpen] = useState<string | undefined>();
    const { user } = useUser();

    return (
        <>
            <RegisterModal
                show={modalOpen === "register" && !user?.token}
                onClose={() => setModalOpen(undefined)}
            />
            <LoginModal
                show={modalOpen === "login" && !user?.token}
                onClose={() => setModalOpen(undefined)}
            />
            <Button
                path={user?.token && "/courses"}
                onClick={
                    user?.token ? undefined : () => setModalOpen("register")
                }
                className="tw-mt-5"
            >
                <i
                    className={`far ${
                        !!user?.firstName ? "fa-search" : "fa-user-plus"
                    } tw-mr-4`}
                />
                <p className="tw-m-0">
                    {!!user?.token ? "Buscar novos cursos" : "Crie uma conta!"}
                </p>
            </Button>
            <MottoText
                text={!!user?.token ? "Continuar estudando?" : "Já é aluno?"}
                path={user?.token && "/profile"}
                onClick={!user?.token ? () => setModalOpen("login") : undefined}
                pathText={
                    !!user?.token
                        ? "Acesse sua área de estudos"
                        : "Acesse sua conta"
                }
                size="md"
                className="tw-mt-[25px]"
            />
        </>
    );
};

export default HeroAction;
