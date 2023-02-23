import { useQuery } from "react-query";
import axios from "./base";

interface Params {
    category?: string;
    search?: string | string[];
}

export async function getCategories() {
    const { data: categories } = await axios.get("/e-learning/categories");
    return categories;
}

export async function getCourses(params?: Params) {
    const { data: courses } = await axios.get(
        "/e-learning/courses",
        params && { params }
    );
    return courses;
}

export async function getCourse(id: string) {
    const { data: course } = await axios.get(`/e-learning/courses/${id}`);
    return course;
}

export async function purchaseCourse(courseId: number) {
    const response = await axios.post(
        `/e-learning/courses/${courseId}/purchase/`
    );
    return response;
}

export function useCoursesQuery(id?: string, params?: Params, options?: any) {
    let queryKey = ["courses"];
    if (id) queryKey.push(id);
    if (params) [...queryKey, ...Object.keys(params), ...Object.values(params)];

    const { isSuccess, isLoading, isError, data } = useQuery(
        queryKey,
        () => (id ? getCourse(id) : getCourses(params)),
        options
    );
    return { isSuccess, isLoading, isError, data };
}

export function useSearchCoursesQuery(search?: string | string[]) {
    const queryKey = ["courses", "search", search];

    const { isSuccess, isLoading, isError, data } = useQuery(queryKey, () =>
        getCourses({ search })
    );

    return { isSuccess, isLoading, isError, data };
}

export async function getLessons(params?: Params) {
    const { data: lessons } = await axios.get(
        "/e-learning/lessons",
        params && { params }
    );
    return lessons;
}

export async function getLesson(id: string) {
    const { data: lesson } = await axios.get(`/e-learning/lessons/${id}`);
    return lesson;
}

export function useLessonsQuery(id?: string, params?: Params) {
    let queryKey = ["lessons"];
    if (id) queryKey.push(id);
    if (params) [...queryKey, ...Object.keys(params), ...Object.values(params)];

    const { isSuccess, isLoading, isError, data } = useQuery(queryKey, () =>
        id ? getLesson(id) : getLessons(params)
    );

    return { isSuccess, isLoading, isError, data };
}

export async function watchLesson(lessonId: number) {
    const response = await axios.post(`/e-learning/lessons/${lessonId}/watch/`);
    return response;
}
