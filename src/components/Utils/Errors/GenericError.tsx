import { useRouter } from 'next/router';

import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

interface Props {
    statusCode: number;
    title: string;
    description: string;
}

const GenericError = ({ statusCode, title, description }: Props) => {
    const { classes } = useStyles();
    const router = useRouter();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>{statusCode}</div>
            <Title className={classes.title}>{title}</Title>
            <Text color='dimmed' size='lg' align='center' className={classes.description}>
                {description}
            </Text>
            <Group position='center'>
                <Button
                    variant='subtle'
                    size='md'
                    onClick={() => void router.push('/')}
                >
                    Quay về trang chủ
                </Button>
            </Group>
        </Container>
    );
};

export default GenericError;