import { Box, Paper } from '@mantine/core';

interface Props {
    children: React.ReactNode | Array<React.ReactNode>;
}

const AppContainer = ({ children }: Props) => {
    return (
        <Box
            sx={(theme) => ({
                marginTop: 0,
                margin: 0,
                [theme.fn.largerThan('sm')]: {
                    margin: theme.spacing.lg
                }
            })}
        >
            <Paper p='sm' pt={0}>
                {children}
            </Paper>
        </Box >
    );
};

export default AppContainer;