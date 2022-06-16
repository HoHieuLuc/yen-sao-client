import AppBreadcrumbs from '../../components/Utils/Breadcrumbs/AppBreadcrumbs';
import About from '../../components/About/About';
import Head from 'next/head';

import { initializeApollo, addApolloState } from '../../graphql/client';
import { pageHooks, pageService } from '../../graphql/queries';
import { GetServerSideProps } from 'next';

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
                <meta property='og:image' content='/logo.png' />
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


export const getServerSideProps: GetServerSideProps = async () => {
    const client = initializeApollo();

    await pageService.getAll(client);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};

export default AboutPage;