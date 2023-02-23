/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ICourse } from "@utils/types";
import { createContext, useContext, useMemo, useReducer } from "react";

const CART_KEY = "cart";

export type CartContextType = {
    cart: ICourse[];
    addToCart: (course: ICourse) => void;
    removeFromCart: (courseId: number) => void;
    clearCart: () => void;
};

export const CartContext = createContext({} as CartContextType);

const initialState = {
    cart: [] as ICourse[],
};

const init = () => {
    if (typeof window === "undefined") return initialState;
    const cartStore = localStorage.getItem(CART_KEY);

    const cart = cartStore ? JSON.parse(cartStore) : [];

    return { ...initialState, cart };
};

interface CartAction {
    type: "ADD_TO_CART" | "REMOVE_FROM_CART" | "CLEAR_CART";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
}

function reducer(state: typeof initialState, action: CartAction) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const cart = [...state.cart, action.payload];
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            return { ...state, cart };
        }
        case "REMOVE_FROM_CART": {
            const cart = state.cart.filter(
                (item) => item.id !== action.payload
            );

            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            return { ...state, cart };
        }
        case "CLEAR_CART": {
            localStorage.removeItem(CART_KEY);
            return { ...state, cart: [] };
        }
        default:
            return state;
    }
}

type TProps = {
    children: React.ReactNode;
};

export const CartProvider = ({ children }: TProps) => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    const value = useMemo(
        () => ({
            ...state,
            addToCart: (course: ICourse) => {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: course,
                });
            },
            removeFromCart: (courseId: number) => {
                dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: courseId,
                });
            },
            clearCart: () => {
                dispatch({
                    type: "CLEAR_CART",
                });
            },
        }),
        [state]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

// User Context Consumer hooks

export const useCart = () => useContext(CartContext);
