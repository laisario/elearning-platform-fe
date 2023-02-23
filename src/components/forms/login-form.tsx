/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Checkbox from "@ui/form-elements/checkbox";
import FeedbackText from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import { useUser } from "@contexts/user-context";

interface IFormValues {
    email: string;
    password: string;
}

const LoginForm = ({ onClose }) => {
    const [serverState, setServerState] = useState("");
    const { login } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        login(data);
        setServerState("");
        onClose();
    };

    return (
        <div className="tw-bg-white tw-shadow-2xs tw-shadow-heading/10 tw-max-w-[470px] tw-pt-7.5 tw-pb-[50px] tw-px-[50px]">
            <h3 className="tw-text-h2 tw-mb-5">Acesse sua conta</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="tw-mb-7.5">
                    <Input
                        id="email"
                        placeholder="Email"
                        bg="light"
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
                        showState={!!hasKey(errors, "email")}
                        {...register("email", {
                            required: "Email é obrigatório!",
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <Input
                        id="password"
                        type="password"
                        placeholder="Senha"
                        bg="light"
                        autoComplete="true"
                        feedbackText={errors?.password?.message}
                        state={hasKey(errors, "password") ? "error" : "success"}
                        showState={!!hasKey(errors, "password")}
                        {...register("password", {
                            required: "Senha é obrigatória!",
                        })}
                    />
                </div>
                <Button type="submit" fullwidth className="tw-mt-7.5">
                    Entrar
                </Button>
                {serverState && <FeedbackText>{serverState}</FeedbackText>}
            </form>
        </div>
    );
};

export default LoginForm;
