import { useRouter } from 'next/router';

import AppBreadcrumbs from '../../components/Utils/Breadcrumbs/AppBreadcrumbs';
import CamNangDetails from '../../components/CamNang/Details/CamNangDetails';
import SanPhamAside from '../../components/SanPham/Aside/SanPhamAside';
import GenericError from '../../components/Utils/Errors/GenericError';
import CamNangList from '../../components/CamNang/List/CamNangList';
import { Divider, Grid, Stack, Text } from '@mantine/core';

import { camNangHooks, camNangService, pageService } from '../../graphql/queries';
import { initializeApollo, addApolloState } from '../../graphql/client';
import { parseString } from '../../utils/common';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const CamNang = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data } = camNangHooks.useCamNangBySlug(parseString(slug));

    if (data && !data.camNang.bySlug) {
        return <GenericError
            statusCode={404}
            title='Cẩm nang này không tồn tại'
            description='Cẩm nang mà bạn muốn xem không tồn tại, hãy kiểm tra lại đường dẫn.'
        />;
    }

    return (
        <>
            {data && data.camNang.bySlug && <Head>
                <title>{`${data && data.camNang.bySlug.tieuDe} - Yến Sào Ms. Tưởng`}</title>
                <meta
                    name='keywords'
                    content={
                        `Yến Sào, yến Nha Trang, yến Khánh Hòa, yến, ${data.camNang.bySlug.tieuDe}`
                    }
                />
                <meta
                    name='title'
                    content={`${data && data.camNang.bySlug.tieuDe} - Yến Sào Ms. Tưởng`}
                />
                <meta
                    name='description'
                    content={data.camNang.bySlug.noiDung}
                />
                {/* ====================== */}
                <meta
                    property='og:title'
                    content={`${data && data.camNang.bySlug.tieuDe} - Yến Sào Ms. Tưởng`}
                />
                <meta
                    property='og:description'
                    content={data.camNang.bySlug.noiDung}
                />
                <meta
                    property='og:image'
                    content={data.camNang.bySlug.anhDaiDien}
                />
            </Head>}
            <Stack spacing='xs'>
                {data && (
                    <>
                        <AppBreadcrumbs
                            data={[
                                {
                                    title: 'Trang chủ',
                                    href: '/'
                                },
                                {
                                    title: 'Cẩm nang',
                                    href: '/cam-nang'
                                },
                                {
                                    title: data.camNang.bySlug.tieuDe,
                                    href: `/cam-nang/${data.camNang.bySlug.slug}`,
                                    disabled: true
                                }
                            ]}
                        />
                        <CamNangDetails data={data.camNang.bySlug} />
                    </>
                )}
                <Divider />
                <Grid>
                    <Grid.Col span={12} md={9}>
                        <Text color='blue' weight={700} size='xl'>
                            Danh sách cẩm nang
                        </Text>
                        <CamNangList />
                    </Grid.Col>
                    <Grid.Col span={12} md={3}>
                        <SanPhamAside />
                    </Grid.Col>
                </Grid>
            </Stack>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo();
    const { query } = context;
    await camNangService.getBySlug(client, parseString(query.slug));
    await pageService.getAll(client);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};

export default CamNang;