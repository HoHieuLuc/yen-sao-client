import { useScrollIntoView } from '@mantine/hooks';

import AppContainer from '../Utils/Wrappers/AppContainer';
import AppHeader from '../Header/Header';
import AppFooter from '../Footer/Footer';
import { Stack } from '@mantine/core';

import { pageHooks } from '../../graphql/queries';

interface Props {
    children?: React.ReactNode;
    loading: boolean;
    debouncedLoading: boolean;
}

const Layout = ({ children, loading, debouncedLoading }: Props) => {
    const { data } = pageHooks.useAllPages();
    const scrollToTop = useScrollIntoView();
    const scrollToFooter = useScrollIntoView();
    return (
        <>
            <Stack
                style={{
                    minHeight: '100vh',
                }}
                spacing='xs'
            >
                <AppHeader
                    loading={loading}
                    debouncedLoading={debouncedLoading}
                    links={[
                        {
                            label: 'Trang chủ',
                            link: '/',
                            onClick: scrollToTop.scrollIntoView
                        },
                        {
                            label: 'Giới thiệu',
                            link: '/',
                            onClick: scrollToTop.scrollIntoView
                        },
                        {
                            label: 'Liên hệ',
                            onClick: scrollToFooter.scrollIntoView
                        }
                    ]}
                />
                <AppContainer>
                    {children}
                </AppContainer>
                {data && (
                    <footer style={{ marginTop: 'auto' }} ref={scrollToFooter.targetRef}>
                        <AppFooter data={data} />
                    </footer>
                )}
            </Stack>
        </>
    );
};

export default Layout;