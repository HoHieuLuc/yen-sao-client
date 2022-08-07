import { Box, Container, Paper } from '@mantine/core';

interface Props {
    children: React.ReactNode | Array<React.ReactNode>;
}

const AppContainer = ({ children }: Props) => {
    return (
        <Container size={'xl'} p={0} m={0}>
            <Box
                sx={(theme) => ({
                    [theme.fn.largerThan('sm')]: {
                        margin: theme.spacing.md,
                    },
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
        </Container>
    );
};

export default AppContainer;