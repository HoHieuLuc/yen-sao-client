import { useRouter } from 'next/router';

import LoadingWrapper from '../../components/Utils/Wrappers/LoadingWrapper';
import { Box } from '@mantine/core';

import { addApolloState, initializeApollo } from '../../graphql/client';
import { sanPhamHooks, sanPhamService } from '../../graphql/queries';
import { parseString } from '../../utils/common';
import { GetServerSideProps } from 'next';

const SanPham = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading } = sanPhamHooks.useSanPhamByID(parseString(id));

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                {data.sanPham.byID.tenSanPham}
            </Box>}
        </LoadingWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo();
    const { query } = context;
    await sanPhamService.getByID(client, parseString(query.id));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};

export default SanPham;