import axios from "./base";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
}

export async function login(payload: LoginPayload) {
    return axios.post("/login/", payload);
}

export async function register({
    firstName,
    lastName,
    passwordConfirmation,
    ...payload
}: RegisterPayload) {
    return axios.post("/register/", {
        ...payload,
        first_name: firstName,
        last_name: lastName,
        password2: passwordConfirmation,
    });
}

export async function getUser(id: number) {
    return axios.get(`/core/users/${id}`);
}
