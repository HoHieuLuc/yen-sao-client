import { useBooleanToggle } from '@mantine/hooks';
import useStyles from './Header.styles';

import { Header, Container, Group, Burger, Image, Stack, Button } from '@mantine/core';
import Link from 'next/link';

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

const AppHeader = ({ links }: HeaderSimpleProps) => {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes } = useStyles();

    const items = links.map((link) => (
        <Button
            variant='subtle'
            key={link.label}
            styles={(theme) => ({
                inner: {
                    [theme.fn.smallerThan('xs')]: {
                        justifyContent: 'flex-start'
                    }
                },
                root: {
                    [theme.fn.smallerThan('xs')]: {
                        width: '100%',
                    },
                }
            })}
        >
            <Link href={link.link}>
                <a className={classes.link}>
                    {link.label}
                </a>
            </Link>
        </Button>
    ));

    return (
        <>
            <Header height={60} style={{ position: 'sticky' }}>
                <Container className={classes.header}>
                    <Image
                        src='/logo.jpg'
                        alt='logo'
                        fit='contain'
                        width={60}
                    />
                    <Group spacing={5} className={classes.links}>
                        {items}
                    </Group>

                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size="sm"
                    />
                </Container>
            </Header>
            {opened && <Stack
                spacing='xs'
                className={classes.burger}
                align='flex-start'
                style={{
                    position: 'fixed',
                    top: 60,
                    zIndex: 1,
                    backgroundColor: 'white',
                    width: '100%'
                }}
            >
                {items}
            </Stack>}
        </>
    );
};

export default AppHeader;