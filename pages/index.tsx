import AppHeader from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import Footer from '../components/Footer/Footer';
import About from '../components/About/About';

import { pageHooks, pageService } from '../graphql/queries';
import { GetServerSideProps } from 'next';

export default function HomePage() {
    const { data } = pageHooks.useAllPages();

    return (
        <Layout>
            <AppHeader
                links={[
                    {
                        label: 'Trang chủ',
                        link: '/',
                    },
                    {
                        label: 'Giới thiệu',
                        link: '/'
                    },
                    {
                        label: 'Sản phẩm',
                        link: '/'
                    },
                    {
                        label: 'Liên hệ',
                        link: '/'
                    }
                ]}
            />
            {data && <About data={data} />}
            {data && <Footer data={data} />}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return pageService.getAllPages();
};