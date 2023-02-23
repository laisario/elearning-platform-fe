import type { NextPage, GetStaticPaths } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseArea from "@containers/course-full";
import { ICourse, ICategory } from "@utils/types";
import {
    getCategories,
    getCourses,
    useCoursesQuery,
} from "../../../lib/course";
import { QueryClient } from "react-query";

type TProps = {
    data: {
        courses: ICourse[];
        category: string;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const CoursesByCategory: PageProps = ({ data }) => {
    const { data: { results: courses } = {} } = useCoursesQuery(
        undefined,
        {
            category: data.category,
        },
        { initialData: data.courses }
    );

    return (
        <>
            <SEO title={data.category} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "pagina inicial" },
                    { path: "/courses", label: "cursos" },
                ]}
                currentPage={data.category}
            />
            <CourseArea data={{ courses }} />
        </>
    );
};

CoursesByCategory.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    const { results: categories } = await getCategories();
    return {
        paths: categories.map((category: ICategory) => {
            return {
                params: {
                    category: category.name,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        category: string;
    };
};

export const getStaticProps = async ({ params: { category } }: Params) => {
    const queryClient = new QueryClient();

    const courses = await getCourses({ category });

    await queryClient.prefetchQuery(["courses", "category", category], () =>
        getCourses({ category })
    );
    return {
        props: {
            data: {
                category,
                courses,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default CoursesByCategory;
