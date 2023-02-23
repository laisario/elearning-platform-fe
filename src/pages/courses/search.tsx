import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Spinner from "@ui/spinner";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseArea from "@containers/course-full";
import { ICourse } from "@utils/types";
import { dehydrate, QueryClient } from "react-query";
import { useSearchCoursesQuery, getCourses } from "../../lib/course";

type TProps = {
    data: {
        courses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Search: PageProps = () => {
    const router = useRouter();
    const { s } = router.query;
    const { data: { results: courses } = {}, isLoading } =
        useSearchCoursesQuery(s);

    if (isLoading) {
        return (
            <div className="tw-w-full tw-h-screen tw-flex tw-justify-center tw-items-center">
                <Spinner />
            </div>
        );
    }
    const title = s ? `Resultados para: '${s as string}'` : "Cursos";
    const paths = s
        ? [
              { path: "/", label: "Pagina inicial" },
              { path: "/courses", label: "Cursos" },
          ]
        : [{ path: "/", label: "Pagina inicial" }];

    return (
        <>
            <SEO title={title} />
            <Breadcrumb pages={paths} currentPage={title} />
            <CourseArea data={{ courses }} />
        </>
    );
};

Search.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["courses", "search", undefined], () =>
        getCourses()
    );

    return {
        props: {
            data: { courses: [] },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};

export default Search;
