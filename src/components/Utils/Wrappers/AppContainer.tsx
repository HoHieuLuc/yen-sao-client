import { Box, Paper } from '@mantine/core';

interface Props {
    children: React.ReactNode | Array<React.ReactNode>;
}

const AppContainer = ({ children }: Props) => {
    return (
        <Box
            sx={(theme) => ({
                [theme.fn.largerThan('sm')]: {
                    margin: theme.spacing.md,
                }
            })}
        >
            <Paper
                p='sm'
                sx={(theme) => ({
                    [theme.fn.largerThan('sm')]: {
                        paddingTop: 0,
                    }
                })}
            >
                {children}
            </Paper>
        </Box >
    );
};

export default AppContainer;