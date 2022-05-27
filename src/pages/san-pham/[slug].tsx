import { useRouter } from 'next/router';

import SanPhamDetails from '../../components/SanPham/Details/SanPhamDetails';
import LoadingWrapper from '../../components/Utils/Wrappers/LoadingWrapper';
import GenericError from '../../components/Utils/Errors/GenericError';

import { addApolloState, initializeApollo } from '../../graphql/client';
import { sanPhamHooks, sanPhamService } from '../../graphql/queries';
import { parseString } from '../../utils/common';
import { GetServerSideProps } from 'next';

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
        <LoadingWrapper loading={loading}>
            {data && data.sanPham.bySlug &&
                <SanPhamDetails data={data.sanPham.bySlug} />
            }
        </LoadingWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo();
    const { query } = context;
    await sanPhamService.getBySlug(client, parseString(query.slug));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};

export default SanPham;