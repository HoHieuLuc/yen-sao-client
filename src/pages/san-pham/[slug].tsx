import { useRouter } from 'next/router';

import SanPhamDetails from '../../components/SanPham/Details/SanPhamDetails';
import LoadingWrapper from '../../components/Utils/Wrappers/LoadingWrapper';
import GenericError from '../../components/Utils/Errors/GenericError';

import { addApolloState, initializeApollo } from '../../graphql/client';
import { pageService, sanPhamHooks, sanPhamService } from '../../graphql/queries';
import { parseNumber, parseString } from '../../utils/common';
import { GetServerSideProps } from 'next';
import { Divider, Stack } from '@mantine/core';
import SanPhamList from '../../components/SanPham/List/SanPhamList';
import Head from 'next/head';

const SanPham = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data, loading } = sanPhamHooks.useSanPhamBySlug(parseString(slug));

    if (data && !data.sanPham.bySlug) {
        return <GenericError
            statusCode={404}
            title='Sản phẩm này không tồn tại'
            description='Sản phẩm mà bạn muốn xem không tồn tại, hãy kiểm tra lại đường dẫn.'
        />;
    }

    return (
        <>
            <Head>
                {data && data.sanPham.bySlug &&
                    <title>{data && data.sanPham.bySlug.tenSanPham} | Yến Sào Ms. Tưởng</title>
                }
            </Head>
            <LoadingWrapper loading={loading}>
                <Stack spacing='xs'>
                    {data && data.sanPham.bySlug &&
                        <SanPhamDetails data={data.sanPham.bySlug} />
                    }
                    <Divider />
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
        page: parseNumber(query.page, 1),
        limit: 12,
        search: parseString(query.search)
    });
    await pageService.getAll(client);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};

export default SanPham;