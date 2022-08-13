import { useRouter } from 'next/router';

import AppBreadcrumbs from '../../components/Utils/Breadcrumbs/AppBreadcrumbs';
import SanPhamDetails from '../../components/SanPham/Details/SanPhamDetails';
import GenericError from '../../components/Utils/Errors/GenericError';
import SanPhamList from '../../components/SanPham/List/SanPhamList';
import { Divider, Stack } from '@mantine/core';
import Head from 'next/head';

import { pageHooks, pageService, sanPhamHooks, sanPhamService } from '../../graphql/queries';
import { addApolloState, initializeApollo } from '../../graphql/client';
import { parseString } from '../../utils/common';
import { GetStaticPaths, GetStaticProps } from 'next';

const SanPham = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data } = sanPhamHooks.useSanPhamBySlug(parseString(slug));

    const pageResult = pageHooks.useAllPages();

    if (data && !data.sanPham.bySlug) {
        return <GenericError
            statusCode={404}
            title='Sản phẩm này không tồn tại'
            description='Sản phẩm mà bạn muốn xem không tồn tại, hãy kiểm tra lại đường dẫn.'
        />;
    }

    return (
        <>
            {data && data.sanPham.bySlug &&
                <Head>
                    <title>{`${data.sanPham.bySlug.tenSanPham} - Yến Sào Ms. Tưởng`}</title>
                    <meta
                        name='keywords'
                        content={
                            `Yến Sào, yến Nha Trang, yến Khánh Hòa, yến, ${data.sanPham.bySlug.tenSanPham}`
                        }
                    />
                    <meta
                        name='title'
                        content={`${data.sanPham.bySlug.tenSanPham} - Yến Sào Ms. Tưởng`}
                    />
                    <meta
                        name='description'
                        content={data.sanPham.bySlug.moTa}
                    />
                    {/* ====================== */}
                    <meta
                        property='og:title'
                        content={`${data.sanPham.bySlug.tenSanPham} - Yến Sào Ms. Tưởng`}
                    />
                    <meta
                        property='og:description'
                        content={data.sanPham.bySlug.moTa}
                    />
                    <meta
                        property='og:image'
                        content={data.sanPham.bySlug.anhSanPham[0]}
                    />
                </Head>
            }
            <Stack spacing='xs'>
                {data && data.sanPham.bySlug &&
                    <>
                        <AppBreadcrumbs
                            data={[
                                {
                                    title: 'Trang chủ',
                                    href: '/'
                                },
                                {
                                    title: data.sanPham.bySlug.tenSanPham,
                                    href: `/san-pham/${data.sanPham.bySlug.slug}`,
                                    disabled: true
                                }
                            ]}
                        />
                        <SanPhamDetails
                            data={data.sanPham.bySlug}
                            pageData={pageResult.data}
                        />
                    </>
                }
                <Divider label='Danh mục sản phẩm' labelPosition='center' />
                <SanPhamList />
            </Stack>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const client = initializeApollo();

    const { data } = await sanPhamService.getAll(client);

    const paths = data.sanPham.all.docs.map(sanPham => ({
        params: {
            slug: sanPham.slug
        }
    }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const client = initializeApollo();

    await sanPhamService.getBySlug(client, parseString(params?.slug));
    await sanPhamService.getAll(client);
    await pageService.getAll(client);

    return addApolloState(client, {
        props: {}
    });
};

export default SanPham;