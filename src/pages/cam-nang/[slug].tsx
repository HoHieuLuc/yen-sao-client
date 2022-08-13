import { useRouter } from 'next/router';

import AppBreadcrumbs from '../../components/Utils/Breadcrumbs/AppBreadcrumbs';
import CamNangDetails from '../../components/CamNang/Details/CamNangDetails';
import SanPhamAside from '../../components/SanPham/Aside/SanPhamAside';
import GenericError from '../../components/Utils/Errors/GenericError';
import CamNangList from '../../components/CamNang/List/CamNangList';
import { Divider, Grid, Stack, Text } from '@mantine/core';
import Head from 'next/head';

import { camNangHooks, camNangService, pageService, sanPhamService } from '../../graphql/queries';
import { initializeApollo, addApolloState } from '../../graphql/client';
import { parseString } from '../../utils/common';
import { GetStaticPaths, GetStaticProps } from 'next';

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
                <title>{`${data.camNang.bySlug.tieuDe} - Yến Sào Ms. Tưởng`}</title>
                <meta
                    name='keywords'
                    content={
                        `Yến Sào, yến Nha Trang, yến Khánh Hòa, yến, ${data.camNang.bySlug.tieuDe}`
                    }
                />
                <meta
                    name='title'
                    content={`${data.camNang.bySlug.tieuDe} - Yến Sào Ms. Tưởng`}
                />
                <meta
                    name='description'
                    content={data.camNang.bySlug.noiDung}
                />
                {/* ====================== */}
                <meta
                    property='og:title'
                    content={`${data.camNang.bySlug.tieuDe} - Yến Sào Ms. Tưởng`}
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
                {data && data.camNang.bySlug && (
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
                            Danh mục cẩm nang
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

export const getStaticPaths: GetStaticPaths = async () => {
    const client = initializeApollo();

    const { data } = await camNangService.getAll(client);

    const paths = data.camNang.all.docs.map(camNang => ({
        params: {
            slug: camNang.slug
        }
    }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const client = initializeApollo();

    await camNangService.getBySlug(client, parseString(params?.slug));
    await camNangService.getAll(client);
    await pageService.getAll(client);
    await sanPhamService.getFeatured(client);

    return addApolloState(client, {
        props: {}
    });
};

export default CamNang;