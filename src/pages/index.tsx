import SanPhamList from '../components/SanPham/SanPhamList';
import { Divider, Stack } from '@mantine/core';
import About from '../components/About/About';

import { pageHooks, pageService, sanPhamService } from '../graphql/queries';
import { addApolloState, initializeApollo } from '../graphql/client';
import { parseNumber, parseString } from '../utils/common';
import { GetServerSideProps } from 'next';

export default function HomePage() {
    const { data } = pageHooks.useAllPages();
    return (
        <Stack spacing='xs'>
            {data && (
                <section>
                    <About data={data} />
                </section>
            )}
            <Divider />
            <SanPhamList />
        </Stack>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo();
    const { query } = context;
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