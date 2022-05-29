import { useScrollIntoView } from '@mantine/hooks';

import FeaturedSanPham from '../components/SanPham/Featured/FeaturedSanPham';
import { faList, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                label='Sản phẩm tiêu biểu'
                onClick={() => scrollToFeaturedSanPhams.scrollIntoView()}
                position={{ bottom: 120, right: 20 }}
                variant='gradient'
                gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                buttonIcon={<FontAwesomeIcon icon={faWandSparkles} />}
            />
            <AppAffix
                label='Tất cả sản phẩm'
                onClick={() => scrollToSanPhamList.scrollIntoView()}
                position={{ bottom: 70, right: 20 }}
                variant='gradient'
                gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                buttonIcon={<FontAwesomeIcon icon={faList} />}
            />
        </Stack>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo();
    const { query } = context;

    await sanPhamService.getAll(client, {
        search: parseString(query.search),
        page: parseNumber(query.page, 1),
        limit: 12,
    });
    await sanPhamService.getFeatured(client);
    await pageService.getAll(client);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};