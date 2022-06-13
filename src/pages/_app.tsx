import { useDebouncedValue } from '@mantine/hooks';
import { useApollo } from '../graphql/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import ErrorBoundary from '../components/Utils/Errors/ErrorBoundary';
import Layout from '../components/Layout/Layout';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';

import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import '../styles/index.css';

type Props = AppProps & {
    colorScheme: ColorScheme;
};

export default function App(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { Component, pageProps } = props;
    const apolloClient = useApollo(pageProps);
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
    const [loading, setLoading] = useState(false);
    const [debouncedLoading] = useDebouncedValue(loading, 100);
    const router = useRouter();

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        setCookies(
            'mantine-color-scheme',
            nextColorScheme,
            { maxAge: 60 * 60 * 24 * 30 }
        );
    };

    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);
        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Yến Sào Ms. Tưởng</title>
                <meta httpEquiv='Content-Type' content='text/html; charset=utf-8'></meta>
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
                <meta name='description' content='Chuyên cung cấp các loại Yến sào ở Nha Trang, Khánh Hòa' />
                <meta name='keywords' content='Yến Sào, yến Nha Trang, yến Khánh Hòa, yến' />
                <meta name='title' content='Yến Sào Ms. Tưởng' />
                <link rel='shortcut icon' href='/favicon.ico' />
                {/* ====================== */}
                <meta property='og:description' content='Cung cấp tổ yến các loại' />
                <meta property='og:title' content='Yến Sào Ms. Tưởng' />
                <meta property='og:site_name' content='Yến Sào Ms. Tưởng' />
                <meta property='og:image' content='/logo.png' />
            </Head>
            <ErrorBoundary>
                <ApolloProvider client={apolloClient}>
                    <ColorSchemeProvider
                        colorScheme={colorScheme}
                        toggleColorScheme={toggleColorScheme}
                    >
                        <MantineProvider
                            theme={{
                                colorScheme,
                                spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
                            }}
                            withGlobalStyles
                            withNormalizeCSS
                        >
                            <Layout
                                loading={loading}
                                debouncedLoading={debouncedLoading}
                            >
                                <Component {...pageProps} />
                            </Layout>
                        </MantineProvider>
                    </ColorSchemeProvider>
                </ApolloProvider>
            </ErrorBoundary>
        </>
    );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});