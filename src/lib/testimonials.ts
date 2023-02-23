import { useQuery } from "react-query";
import axios from "./base";

export async function getTestimonials() {
    const { data: testimonials } = await axios.get("/core/testimonials");
    return testimonials;
}

export function useTestimonialsQuery(options?: any) {
    const { isSuccess, isLoading, isError, data } = useQuery(
        ["testimonials"],
        () => getTestimonials(),
        options
    );
    return { isSuccess, isLoading, isError, data };
}
