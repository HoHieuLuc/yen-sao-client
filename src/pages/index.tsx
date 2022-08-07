import { useScrollIntoView } from '@mantine/hooks';

import FeaturedSanPham from '../components/SanPham/Featured/FeaturedSanPham';
import { faList, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SanPhamList from '../components/SanPham/List/SanPhamList';
import { HeroHeader } from '../components/HeroHeader/HeroHeader';
import NewCamNang from '../components/CamNang/New/NewCamNang';
import AppAffix from '../components/Utils/Affix/AppAffix';
import { Stack } from '@mantine/core';
import Head from 'next/head';

import { camNangService, pageHooks, pageService, sanPhamService } from '../graphql/queries';
import { addApolloState, initializeApollo } from '../graphql/client';
import { parseNumber, parseString } from '../utils/common';
import { GetServerSideProps } from 'next';

export default function HomePage() {
    const { data } = pageHooks.useAllPages();

    const scrollToSanPhamList = useScrollIntoView<HTMLDivElement>({ offset: 100 });
    const scrollToFeaturedSanPhams = useScrollIntoView<HTMLDivElement>({ offset: 50 });

    return (
        <>
            <Head>
                <meta name='description' content='Chuyên cung cấp các loại Yến sào ở Nha Trang, Khánh Hòa' />
                <meta name='keywords' content='Yến Sào, yến Nha Trang, yến Khánh Hòa, yến' />
                <meta name='title' content='Yến Sào Ms. Tưởng' />
                <link rel='shortcut icon' href='/favicon.ico' />
                {/* ====================== */}
                <meta property='og:description' content='Cung cấp tổ yến các loại' />
                <meta property='og:title' content='Yến Sào Ms. Tưởng' />
                <meta property='og:site_name' content='Yến Sào Ms. Tưởng' />
                <meta property='og:image' content='/logo.jpg' />
            </Head>
            <Stack spacing='xs'>
                <HeroHeader
                    onFirstButtonClick={data
                        && data.page.websiteInfo
                        && data.page.websiteInfo.content.facebook
                        ? () => window.open(
                            data.page.websiteInfo?.content.facebook,
                            '_blank')
                        : undefined
                    }
                    onSecondButtonClick={scrollToFeaturedSanPhams.scrollIntoView}
                />
                <NewCamNang />
                <div ref={scrollToFeaturedSanPhams.targetRef}>
                    <FeaturedSanPham />
                </div>
                <div ref={scrollToSanPhamList.targetRef}>
                    <SanPhamList />
                </div>
                <AppAffix
                    label='Sản phẩm nổi bật'
                    onClick={scrollToFeaturedSanPhams.scrollIntoView}
                    position={{ bottom: 120, right: 20 }}
                    variant='gradient'
                    gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                    buttonIcon={<FontAwesomeIcon icon={faWandSparkles} />}
                />
                <AppAffix
                    label='Tất cả sản phẩm'
                    onClick={scrollToSanPhamList.scrollIntoView}
                    position={{ bottom: 70, right: 20 }}
                    variant='gradient'
                    gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                    buttonIcon={<FontAwesomeIcon icon={faList} />}
                />
            </Stack>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = initializeApollo();
    const { query } = context;

    await sanPhamService.getAll(client, {
        page: parseNumber(query.page, 1),
        search: parseString(query.search),
        limit: 12,
    });
    await sanPhamService.getFeatured(client);
    await pageService.getAll(client);
    await camNangService.getAll(client, {
        page: 1,
        limit: 4,
        search: ''
    });

    return addApolloState(client, {
        props: {}
    });
};