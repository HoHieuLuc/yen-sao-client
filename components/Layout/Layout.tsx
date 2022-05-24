import { Box } from '@mantine/core';

interface Props {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <Box style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            {children}
        </Box>
    );
};

export default Layout;