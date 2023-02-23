import type { NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import CourseArea from "@containers/course/index2";
import { ICourse } from "@utils/types";

type TProps = {
    data: {
        courses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const Carrinho: PageProps = () => {
    return (
        <>
            <SEO title="Carrinho" />
            <CourseArea />
        </>
    );
};

Carrinho.Layout = Layout01;

export default Carrinho;
