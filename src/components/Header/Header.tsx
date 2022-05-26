import { useBooleanToggle, useClickOutside } from '@mantine/hooks';
import useStyles from './Header.styles';

import { Header, Container, Group, Burger, Image, Stack, Button, Collapse, Progress } from '@mantine/core';
import { useRouter } from 'next/router';

interface HeaderSimpleProps {
    links: {
        link?: string;
        label: string;
        onClick?: () => void;
    }[];
    loading: boolean;
    debouncedLoading: boolean;
}

const AppHeader = ({ links, loading, debouncedLoading }: HeaderSimpleProps) => {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes } = useStyles();
    const menuRef = useClickOutside(() => toggleOpened(false));
    const router = useRouter();

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
            onClick={() => {
                if (link.link && link.link !== router.pathname) {
                    void router.push(link.link).then(() => {
                        link.onClick && link.onClick();
                    });
                    return;
                }
                link.onClick && link.onClick();
            }}
        >
            {link.label}
        </Button>
    ));

    return (
        <>
            <Header ref={menuRef} height={60} style={{ position: 'sticky' }}>
                {
                    !loading && !debouncedLoading
                        ? <></>
                        : <Progress animate value={loading ? 30 : 100} size='sm' />
                }
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
            <Collapse
                in={opened}
                style={{
                    position: 'fixed',
                    top: 60,
                    zIndex: 1,
                    backgroundColor: 'white',
                    width: '100%',
                    borderBottom: '1px solid #e5e5e5',
                }}
            >
                <Stack
                    spacing='xs'
                    className={classes.burger}
                    align='flex-start'
                >
                    {items}
                </Stack>
            </Collapse>
        </>
    );
};

export default AppHeader;