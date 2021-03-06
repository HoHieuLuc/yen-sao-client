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
    }, [router.asPath]);

    return (
        <>
            <Head>
                <title>Y???n S??o Ms. T?????ng</title>
                <meta httpEquiv='Content-Type' content='text/html; charset=utf-8'></meta>
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
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
                                fontFamily: 'Montserrat',
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