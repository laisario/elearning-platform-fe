import axios from "axios";
import { parseCookies } from "nookies";

const getAxiosInstance = (ctx?: any) => {
    const { token } = parseCookies(ctx);

    const instance = axios.create({
        baseURL: "https://api.medcursos.online",
    });
    if (token) instance.defaults.headers.Authorization = `Bearer ${token}`;

    return instance;
};

export default getAxiosInstance();
