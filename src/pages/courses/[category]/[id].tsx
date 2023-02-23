import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseDetails from "@containers/course-details";
import RelatedCourseArea from "@containers/course";
import { ICourse } from "@utils/types";
import { QueryClient } from "react-query";
import { getCourse, getCourses, useCoursesQuery } from "../../../lib/course";

type TProps = {
    data: {
        id: string;
        category: string;
        course: ICourse;
        relatedCourses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const SingleCourse: PageProps = ({ data }) => {
    const { data: courseData } = useCoursesQuery(data.id, undefined, {
        initialData: data.course,
    });
    const course = courseData as ICourse;
    const { data: { results: relatedCourses } = {} } = useCoursesQuery(
        undefined,
        { category: data.category },
        { initialData: data.relatedCourses }
    );

    if (!course) return null;

    return (
        <>
            <SEO
                title={course.name}
                description={course.summary}
                openGraph={{
                    type: "website",
                    images: [
                        {
                            url: course.thumbnail,
                            width: 800,
                            height: 600,
                            alt: course.name,
                        },
                        {
                            url: course.thumbnail,
                            width: 900,
                            height: 800,
                            alt: course.name,
                        },
                    ],
                }}
                jsonLdType="course"
            />
            <Breadcrumb
                pages={[
                    { path: "/", label: "pagina inicial" },
                    { path: "/courses", label: "cursos" },
                    {
                        path: `/courses/${course.category.name}`,
                        label: course.category.name,
                    },
                ]}
                currentPage={course.name}
            />
            <CourseDetails data={{ course }} />
            {relatedCourses?.length > 0 && (
                <RelatedCourseArea
                    data={{
                        courses: relatedCourses,
                    }}
                    title="Cursos Relacionados​"
                    subtitle=" "
                />
            )}
        </>
    );
};

SingleCourse.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    const { results: courses } = await getCourses();

    return {
        paths: courses.map((course: ICourse) => {
            return {
                params: {
                    category: course.category.name,
                    id: course.id.toString(),
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        id: string;
        category: string;
    };
};

export const getStaticProps = async ({ params }: Params) => {
    const queryClient = new QueryClient();

    const course = await getCourse(params.id);
    const relatedCourses = await getCourses({ category: params.category });

    await queryClient.prefetchQuery(["courses", params.id], () =>
        getCourse(params.id)
    );

    await queryClient.prefetchQuery(
        ["courses", "category", params.category],
        () => getCourses({ category: params.category })
    );

    return {
        props: {
            data: { ...params, course, relatedCourses },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default SingleCourse;
