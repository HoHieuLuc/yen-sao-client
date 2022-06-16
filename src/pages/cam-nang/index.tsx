import AppBreadcrumbs from '../../components/Utils/Breadcrumbs/AppBreadcrumbs';
import SanPhamAside from '../../components/SanPham/Aside/SanPhamAside';
import CamNangList from '../../components/CamNang/List/CamNangList';
import { Grid } from '@mantine/core';
import Head from 'next/head';

import { camNangService, pageService, sanPhamService } from '../../graphql/queries';
import { initializeApollo, addApolloState } from '../../graphql/client';
import { parseNumber, parseString } from '../../utils/common';
import { GetServerSideProps } from 'next';

const CamNang = () => {
    return (
        <>
            <Head>
                <title>Cẩm nang - Yến Sào Ms. Tưởng</title>
            </Head>
            <AppBreadcrumbs 
                data={[
                    {
                        title: 'Trang chủ',
                        href: '/'
                    },
                    {
                        title: 'Cẩm nang',
                        href: '/cam-nang',
                        disabled: true
                    }
                ]}
            />
            <Grid>
                <Grid.Col span={12} md={9}>
                    <CamNangList />
                </Grid.Col>
                <Grid.Col span={12} md={3}>
                    <SanPhamAside />
                </Grid.Col>
            </Grid>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo();
    const { query } = context;
    await camNangService.getAll(client, {
        page: parseNumber(query.page, 1),
        search: parseString(query.search),
        limit: 10
    });
    await pageService.getAll(client);
    await sanPhamService.getFeatured(client);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};

export default CamNang;