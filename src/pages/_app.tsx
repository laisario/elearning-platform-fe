import { ElementType, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import SEO from "@components/seo/deafult-seo";
import FallbackLayout from "@layout/fallback";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";

import "@assets/css/font-awesome-pro.min.css";
import "@assets/css/font-linea.css";
import "@assets/css/fonts.css";
import "@assets/css/tailwind.css";
import "@assets/css/swiper.css";

import { UIProvider } from "../contexts/ui-context";
import { UserProvider } from "../contexts/user-context";
import { CartProvider } from "../contexts/cart-context";

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"] & { Layout: ElementType };
    pageProps: {
        [key: string]: unknown;
    };
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
    const [queryClient] = useState(() => new QueryClient());
    const router = useRouter();
    const Layout = Component.Layout || FallbackLayout;
    const layoutProps =
        typeof pageProps.layout === "object" ? pageProps.layout : {};

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
    }, [router]);

    useEffect(() => {
        document.body.className = (pageProps.className as string) || "";
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <UIProvider>
                    <UserProvider>
                        <CartProvider>
                            <Layout {...layoutProps}>
                                <SEO />
                                <Component {...pageProps} />
                            </Layout>
                        </CartProvider>
                    </UserProvider>
                </UIProvider>
            </Hydrate>
        </QueryClientProvider>
    );
};

export default MyApp;
