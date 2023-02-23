import { useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import { useRouter } from "next/router";
import Layout01 from "@layout/layout-01";
import ProfileBio from "@containers/profile/bio";
import Spinner from "@ui/spinner";
import { useUser } from "@contexts/user-context";
import { useMount } from "@hooks";

type PageProps = NextPage & {
    Layout: typeof Layout01;
};

const Profile: PageProps = () => {
    const mounted = useMount();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user.token) {
            void router.push("/");
        }
    }, [user, router]);

    if (!mounted) return null;

    if (!user.token) {
        return (
            <div className="tw-fixed tw-bg-light-100 tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
                <Spinner />
            </div>
        );
    }
    return (
        <>
            <SEO title="Profile" />
            <ProfileBio />
        </>
    );
};

Profile.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Profile;
