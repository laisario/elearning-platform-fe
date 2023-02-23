import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import HeroArea from "@containers/hero";
import CourseArea from "@containers/course";
import VideoArea from "@containers/video";
import TestimonialArea from "@containers/testimonial";
import CtaArea from "@containers/cta";

import { ICourse } from "@utils/types";

import { dehydrate, QueryClient } from "react-query";
import { getTestimonials, useTestimonialsQuery } from "lib/testimonials";
import { getCourses, useCoursesQuery } from "../lib/course";

interface PageContent {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
        courses: ICourse[];
        testimonials: any[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Home: PageProps = ({ data }) => {
    const { data: { results: courses } = {} } = useCoursesQuery(
        undefined,
        undefined,
        { initialData: data.courses }
    );
    const { data: { results: testimonials } = {} } = useTestimonialsQuery({
        initialData: data.testimonials,
    });

    return (
        <>
            <SEO title="Cursos da Tia Ale" />
            <HeroArea />
            <CourseArea data={{ courses }} />
            <VideoArea />
            {!!testimonials?.length && <TestimonialArea data={testimonials} />}
            <CtaArea />
        </>
    );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    const courses = await getCourses();
    const testimonials = await getTestimonials();
    await queryClient.prefetchQuery(["courses"], () => getCourses());
    await queryClient.prefetchQuery(["testimonials"], () => getTestimonials());

    return {
        props: {
            data: {
                courses,
                testimonials,
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

export default Home;
