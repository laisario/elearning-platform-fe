import { createContext, useContext, useMemo, useReducer } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { jwtVerify } from "jose";
import {
    getUser,
    login,
    LoginPayload,
    register,
    RegisterPayload,
} from "lib/auth";
import { purchaseCourse, watchLesson } from "lib/course";
import axios from "lib/base";
import { ICourse, ILesson } from "@utils/types";

export type UserType = {
    token: string;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    admin: boolean;
    purchasedCourses?: ICourse[];
    watchedLessons?: number[];
};

export type UserContextType = {
    user: UserType;
    login: (payload: LoginPayload) => void;
    register: (payload: RegisterPayload) => void;
    update: () => Promise<void>;
    purchaseCourse: (course: ICourse) => void;
    watchLesson: (lesson: ILesson) => Promise<void>;
};

export const UserContext = createContext({} as UserContextType);

const initialState = {
    user: {},
};

const init = () => {
    const { user } = parseCookies();
    if (!user) return initialState;

    return {
        ...initialState,
        user: JSON.parse(user),
    };
};

interface UserAction {
    type: "LOGIN" | "REGISTER" | "LOGOUT" | "PURCHASE";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
}

function reducer(state: typeof initialState, action: UserAction) {
    switch (action.type) {
        case "LOGIN":
            setCookie(undefined, "user", JSON.stringify(action.payload), {
                maxAge: 60 * 60 * 24 * 15, // 15 days
            });

            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            destroyCookie(undefined, "user");
            return {
                ...state,
                user: {},
            };
        default:
            return state;
    }
}

type TProps = {
    children: React.ReactNode;
};
const secret = new TextEncoder().encode("QeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4");
const setupUser = async (token: string) => {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    const {
        payload: { email, firstName, lastName, isStaff, user_id },
    } = await jwtVerify(token, secret);

    const userId = user_id as number;
    const { data: { purchased_courses, watched_lessons } = {} } = await getUser(
        userId
    );
    console.log(user_id, email, firstName, lastName, token);
    return {
        email,
        firstName,
        lastName,
        admin: isStaff,
        id: user_id,
        token,
        purchasedCourses: purchased_courses.map(
            (purchased: any) => purchased.course
        ),
        watchedLessons: watched_lessons.map((watched: any) => watched.lesson),
    };
};

export const UserProvider = ({ children }: TProps) => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    const value = useMemo(
        () => ({
            ...state,
            login: async (payload: LoginPayload) => {
                const { data } = await login(payload);
                const user = await setupUser(data.access);
                dispatch({ type: "LOGIN", payload: user });
            },
            register: async (payload: RegisterPayload) => {
                const { status } = await register(payload);
                if (status === 201) {
                    const { data } = await login({
                        email: payload.email,
                        password: payload.password,
                    });
                    const user = await setupUser(data.access);
                    dispatch({ type: "LOGIN", payload: user });
                }
            },
            logout: () => dispatch({ type: "LOGOUT" }),
            purchaseCourse: async (course: ICourse) => {
                await purchaseCourse(course.id);
            },
            watchLesson: async (lesson: ILesson) => {
                await watchLesson(lesson.id);
            },
            update: async () => {
                const user = await setupUser(state.user?.token);
                dispatch({ type: "LOGIN", payload: user });
            },
        }),
        [state]
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

// User Context Consumer hooks

export const useUser = () => useContext(UserContext);
