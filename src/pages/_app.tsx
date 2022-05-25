import { useApollo } from '../graphql/client';
import { useState } from 'react';

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
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

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        setCookies(
            'mantine-color-scheme',
            nextColorScheme,
            { maxAge: 60 * 60 * 24 * 30 }
        );
    };

    return (
        <>
            <Head>
                <title>Yến Sào MS.Tưởng</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>

            <ApolloProvider client={apolloClient}>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <MantineProvider
                        theme={{
                            colorScheme,
                            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
                        }}
                        withGlobalStyles
                        withNormalizeCSS
                    >
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </MantineProvider>
                </ColorSchemeProvider>
            </ApolloProvider>
        </>
    );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});