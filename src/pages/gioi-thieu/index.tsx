import AppBreadcrumbs from '../../components/Utils/Breadcrumbs/AppBreadcrumbs';
import About from '../../components/About/About';
import Head from 'next/head';

import { initializeApollo, addApolloState } from '../../graphql/client';
import { pageHooks, pageService } from '../../graphql/queries';
import { GetStaticProps } from 'next';

const AboutPage = () => {
    const { data } = pageHooks.useAllPages();

    return (
        <>
            <Head>
                <title>Giới thiệu - Yến Sào Ms. Tưởng</title>
                <meta name='keywords' content='Yến Sào, yến Nha Trang, yến Khánh Hòa, yến, giới thiệu' />
                <meta name='title' content='Giới thiệu - Yến Sào Ms. Tưởng' />
                <link rel='shortcut icon' href='/favicon.ico' />
                {/* ====================== */}
                <meta property='og:description' content='Giới thiệu - Yến Sào Ms. Tưởng' />
                <meta property='og:title' content='Giới thiệu - Yến Sào Ms. Tưởng' />
                <meta property='og:site_name' content='Yến Sào Ms. Tưởng' />
                <meta property='og:image' content='/logo.jpg' />
            </Head>
            <AppBreadcrumbs
                data={[
                    {
                        title: 'Trang chủ',
                        href: '/'
                    },
                    {
                        title: 'Giới thiệu',
                        href: '/gioi-thieu',
                        disabled: true
                    }
                ]}
            />
            {data && <About data={data} />}
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const client = initializeApollo();

    await pageService.getAll(client);

    return addApolloState(client, {
        props: {}
    });
};

export default AboutPage;