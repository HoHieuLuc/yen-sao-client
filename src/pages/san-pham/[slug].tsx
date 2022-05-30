import { useRouter } from 'next/router';

import SanPhamDetails from '../../components/SanPham/Details/SanPhamDetails';
import LoadingWrapper from '../../components/Utils/Wrappers/LoadingWrapper';
import GenericError from '../../components/Utils/Errors/GenericError';
import SanPhamList from '../../components/SanPham/List/SanPhamList';
import { Divider, Stack } from '@mantine/core';
import Head from 'next/head';

import { pageHooks, pageService, sanPhamHooks, sanPhamService } from '../../graphql/queries';
import { addApolloState, initializeApollo } from '../../graphql/client';
import { parseNumber, parseString } from '../../utils/common';
import { GetServerSideProps } from 'next';

const SanPham = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data, loading } = sanPhamHooks.useSanPhamBySlug(parseString(slug));
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
                    <title>{`${data && data.sanPham.bySlug.tenSanPham} - Yến Sào Ms. Tưởng`}</title>
                    <meta
                        property='og:description'
                        content={`${data && data.sanPham.bySlug.tenSanPham} - Yến Sào Ms. Tưởng`}
                    />
                </Head>
            }
            <LoadingWrapper loading={loading}>
                <Stack spacing='xs'>
                    {data && data.sanPham.bySlug && 
                        <SanPhamDetails
                            data={data.sanPham.bySlug}
                            pageData={pageResult.data}
                        />
                    }
                    <Divider label='Danh mục sản phẩm' labelPosition='center' />
                    <SanPhamList />
                </Stack>
            </LoadingWrapper>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo();
    const { query } = context;

    await sanPhamService.getBySlug(client, parseString(query.slug));
    await sanPhamService.getAll(client, {
        search: parseString(query.search),
        page: parseNumber(query.page, 1),
        limit: 12,
    });
    await pageService.getAll(client);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};

export default SanPham;