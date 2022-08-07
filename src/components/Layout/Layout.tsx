import { useScrollIntoView } from '@mantine/hooks';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContainer from '../Utils/Wrappers/AppContainer';
import AppAffix from '../Utils/Affix/AppAffix';
import AppHeader from '../Header/Header';
import AppFooter from '../Footer/Footer';
import { Box } from '@mantine/core';

import { pageHooks } from '../../graphql/queries';

interface Props {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    const { data } = pageHooks.useAllPages();
    const scrollToTop = useScrollIntoView();
    const scrollToFooter = useScrollIntoView();
    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <AppHeader
                    links={[
                        {
                            label: 'Trang chủ',
                            href: '/',
                            onClick: scrollToTop.scrollIntoView
                        },
                        {
                            label: 'Giới thiệu',
                            href: '/gioi-thieu',
                            onClick: scrollToTop.scrollIntoView
                        },
                        {
                            label: 'Cẩm nang',
                            href: '/cam-nang',
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
            </Box>
            {data && data.page.websiteInfo && data.page.websiteInfo.content.facebook &&
                <AppAffix
                    label='Facebook'
                    onClick={() => window.open(
                        data.page.websiteInfo?.content.facebook,
                        '_blank')
                    }
                    position={{ bottom: 20, right: 20 }}
                    variant='gradient'
                    gradient={{ from: 'violet', to: 'blue', deg: 90 }}
                    buttonIcon={<FontAwesomeIcon icon={faFacebookF} />}
                />
            }
        </>
    );
};

export default Layout;