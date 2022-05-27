import { useScrollIntoView } from '@mantine/hooks';

import FeaturedSanPham from '../components/SanPham/Featured/FeaturedSanPham';
import SanPhamList from '../components/SanPham/List/SanPhamList';
import AppAffix from '../components/Utils/Affix/AppAffix';
import About from '../components/About/About';
import { Stack } from '@mantine/core';

import { pageHooks, pageService, sanPhamService } from '../graphql/queries';
import { addApolloState, initializeApollo } from '../graphql/client';
import { parseNumber, parseString } from '../utils/common';
import { GetServerSideProps } from 'next';

export default function HomePage() {
    const { data } = pageHooks.useAllPages();

    const scrollToSanPhamList = useScrollIntoView<HTMLDivElement>({ offset: 100 });
    const scrollToFeaturedSanPhams = useScrollIntoView<HTMLDivElement>({ offset: 50 });

    return (
        <Stack spacing='xs'>
            {data && (
                <section>
                    <About data={data} />
                </section>
            )}
            <div ref={scrollToFeaturedSanPhams.targetRef}>
                <FeaturedSanPham />
            </div>
            <div ref={scrollToSanPhamList.targetRef}>
                <SanPhamList />
            </div>
            <AppAffix
                label='Tất cả sản phẩm'
                onClick={() => scrollToSanPhamList.scrollIntoView()}
                mounted={true}
                position={{ bottom: 20, right: 20 }}
                variant='gradient'
                gradient={{ from: 'violet', to: 'blue', deg: 90 }}
            />
            <AppAffix
                label='Sản phẩm tiêu biểu'
                onClick={() => scrollToFeaturedSanPhams.scrollIntoView()}
                mounted={true}
                position={{ bottom: 20, right: 200 }}
                variant='gradient'
                gradient={{ from: 'violet', to: 'blue', deg: 90 }}
            />
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
    await sanPhamService.getFeatured(client);
    await pageService.getAll(client);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};