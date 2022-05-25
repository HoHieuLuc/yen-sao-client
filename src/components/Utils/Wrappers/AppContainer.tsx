import { Box, Paper } from '@mantine/core';

interface Props {
    children: React.ReactNode | Array<React.ReactNode>;
}

const AppContainer = ({ children }: Props) => {
    return (
        <Box
            sx={(theme) => ({
                margin: theme.spacing.lg
            })}
        >
            <Paper withBorder p='sm'>
                {children}
            </Paper>
        </Box>
    );
};

export default AppContainer;