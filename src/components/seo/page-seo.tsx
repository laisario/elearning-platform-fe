import { useEffect, useState } from "react";
import { NextSeo, NextSeoProps, CourseJsonLd } from "next-seo";
import siteConfig from "@data/site-config";

interface SeoProps extends NextSeoProps {
    template?: string;
    jsonLdType?: "article" | "course";
    article?: {
        publishedTime: string;
        modifiedTime: string;
        tags: string[];
    };
    image?: string;
}

const PageSeo = ({
    title,
    description,
    template,
    openGraph,
    jsonLdType,
    article,
    image,
}: SeoProps) => {
    const [href, setHref] = useState("");
    useEffect(() => {
        setHref(window.location.href);
    }, []);

    const articleMeta = jsonLdType === "article" && {
        type: "article",
        ...article,
        images: [
            {
                url: image as string,
                width: 800,
                height: 600,
                alt: title,
            },
            {
                url: image as string,
                width: 900,
                height: 800,
                alt: title,
            },
        ],
    };

    return (
        <>
            <NextSeo
                title={title}
                titleTemplate={
                    template
                        ? `${title as string} - ${template}`
                        : siteConfig.titleTemplate
                }
                description={description}
                openGraph={{
                    url: href,
                    title,
                    description,
                    ...openGraph,
                    ...articleMeta,
                }}
            />
            {jsonLdType === "course" && (
                <CourseJsonLd
                    courseName={title as string}
                    description="Introductory CS course laying out the basics."
                    provider={{
                        name: "Alessandra Patricio",
                        url: href,
                    }}
                />
            )}
        </>
    );
};

PageSeo.defaultProps = {
    template: siteConfig.name,
};

export default PageSeo;
