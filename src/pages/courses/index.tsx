import type { NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseArea from "@containers/course-full";
import { dehydrate, QueryClient } from "react-query";
import { useCoursesQuery, getCourses } from "../../lib/course";

type PageProps = NextPage & {
    Layout: typeof Layout01;
};

const Courses: PageProps = ({ data }: any) => {
    const { data: { results: courses } = {} } = useCoursesQuery(
        undefined,
        undefined,
        { initialData: data.courses }
    );

    return (
        <>
            <SEO title="Cursos" />
            <Breadcrumb
                pages={[{ path: "/", label: "pagina inicial" }]}
                currentPage="Cursos"
            />
            <CourseArea data={{ courses }} />
        </>
    );
};

Courses.Layout = Layout01;

export const getStaticProps = async () => {
    const queryClient = new QueryClient();

    const courses = await getCourses();

    await queryClient.prefetchQuery(["courses"], () => getCourses());

    return {
        props: {
            data: {
                courses,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};

export default Courses;
