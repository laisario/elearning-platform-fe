import { useEffect } from "react";
import type { GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Layout04 from "@layout/layout-04";
import LessonDetails from "@containers/lesson-details";
import Spinner from "@ui/spinner";
import { flatDeep } from "@utils/methods";
import { ICourse } from "@utils/types";
import { useUser } from "@contexts/user-context";
import {
    getCourse,
    getCourses,
    getLesson,
    useLessonsQuery,
} from "../../../../lib/course";
import { QueryClient, dehydrate } from "react-query";

type TProps = {
    data: {
        lesson: string;
        course: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout04;
};

const Lesson: PageProps = ({ data: { lesson: id, course } }) => {
    const { user } = useUser();
    const { data: lesson } = useLessonsQuery(id);
    const router = useRouter();

    const enrolledCourse = user?.purchasedCourses?.some(
        (purchased) => purchased.id === Number(course)
    );

    useEffect(() => {
        if (!user?.token || !enrolledCourse) {
            void router.back();
        }
    }, [router, enrolledCourse, user]);

    return (
        <>
            <SEO title={lesson?.name} />
            {!lesson && (
                <div className="tw-fixed tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
                    <Spinner />
                </div>
            )}
            {lesson && <LessonDetails data={{ lesson, course }} />}
        </>
    );
};

Lesson.Layout = Layout04;

type Param = {
    course: number;
    lesson: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { results: courses } = await getCourses();

    const params = courses.map((course: ICourse) => {
        return course.sections.map((section) => {
            return section.lessons.map((lesson) => {
                return {
                    course: course.id.toString(),
                    lesson: lesson.id.toString(),
                };
            });
        });
    });

    const page = flatDeep(params, 4);

    return {
        paths: page.map((value: any) => {
            return {
                params: {
                    lesson: value.lesson,
                    course: value.course,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: Param;
};

export async function getStaticProps({ params }: Params) {
    const queryClient = new QueryClient();

    const course = await getCourse(params.course.toString());

    await queryClient.prefetchQuery(["lessons", params.lesson], () =>
        getLesson(params.lesson)
    );

    return {
        props: {
            className: "tw-overflow-y-hidden tw-relative",
            data: params,
            layout: { course },
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
}

export default Lesson;
