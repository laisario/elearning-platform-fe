import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import { useUser } from "@contexts/user-context";

interface IFormValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirmation: string;
}

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<IFormValues>();

    const { register: registerUser } = useUser();
    const onSubmit: SubmitHandler<IFormValues> = (values) => {
        registerUser(values);
    };

    return (
        <div className="tw-px-[50px]">
            <h3 className="tw-text-h2 tw-mb-5">
                Não tem uma conta? Registre-se já!
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="tw-mb-7.5 tw-flex tw-flex-row tw-gap-x-7.5">
                    <Input
                        id="firstName"
                        placeholder="Nome"
                        bg="light"
                        feedbackText={errors?.firstName?.message}
                        state={
                            hasKey(errors, "firstName") ? "error" : "success"
                        }
                        showState={!!hasKey(errors, "firstName")}
                        {...register("firstName", {
                            required: "Nome é obrigatório!",
                        })}
                    />
                    <Input
                        id="lastName"
                        placeholder="Sobrenome"
                        bg="light"
                        feedbackText={errors?.lastName?.message}
                        state={hasKey(errors, "lastName") ? "error" : "success"}
                        showState={!!hasKey(errors, "lastName")}
                        {...register("lastName", {
                            required: "Sobrenome é obrigatório!",
                        })}
                    />
                </div>
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
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Email inválido!",
                            },
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
                <div className="tw-mb-7.5">
                    <Input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Confirmação da senha"
                        bg="light"
                        autoComplete="true"
                        feedbackText={errors?.passwordConfirmation?.message}
                        state={
                            hasKey(errors, "passwordConfirmation")
                                ? "error"
                                : "success"
                        }
                        showState={!!hasKey(errors, "passwordConfirmation")}
                        {...register("passwordConfirmation", {
                            required: "Confirmação da senha é obrigatória!",
                            validate: (value) =>
                                value === getValues("password") ||
                                "A senha e sua confirmação devem ser iguais!",
                        })}
                    />
                </div>

                <Button type="submit" fullwidth className="tw-mt-7.5">
                    Criar sua conta
                </Button>
            </form>
        </div>
    );
};

export default RegisterForm;
