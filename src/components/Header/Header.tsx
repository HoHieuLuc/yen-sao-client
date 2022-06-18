import { useBooleanToggle } from '@mantine/hooks';
import { useRouter } from 'next/router';
import useStyles from './Header.styles';

import {
    Header, Container, Group, Burger,
    Stack, Button, Progress, Drawer
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';


interface Props {
    links: Array<{
        href?: string;
        label: string;
        onClick?: () => void;
    }>;
    loading: boolean;
    debouncedLoading: boolean;
}

const AppHeader = ({ links, loading, debouncedLoading }: Props) => {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes } = useStyles();
    const router = useRouter();

    const items = links.map((link) => (
        link.href && link.href !== router.pathname
            ? <Link href={link.href} key={link.label}>
                <a className={classes.aTag}>
                    <Button
                        variant='subtle'
                        key={link.label}
                        classNames={{
                            root: classes.linkItem
                        }}
                    >
                        {link.label}
                    </Button>
                </a>
            </Link>
            : <Button
                variant='subtle'
                key={link.label}
                classNames={{
                    root: classes.linkItem
                }}
                onClick={() => {
                    link.onClick && link.onClick();
                }}
            >
                {link.label}
            </Button>
    ));

    return (
        <>
            <Header height='4rem' style={{ position: 'sticky' }}>
                {
                    !loading && !debouncedLoading
                        ? <></>
                        : <Progress
                            animate
                            value={loading ? 30 : 100}
                            size='sm'
                        />
                }
                <Container className={classes.header}>
                    <div style={{ width: '3rem', height: '3rem' }}>
                        <Link href='/'>
                            <a>

                                <Image
                                    alt='logo'
                                    src='/logo.png'
                                    layout='responsive'
                                    width='100%'
                                    height='100%'
                                    objectFit='scale-down'
                                    sizes='10vw'
                                    priority
                                />
                            </a>
                        </Link>
                    </div>
                    <Group spacing={5} className={classes.links}>
                        {items}
                    </Group>

                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size='sm'
                    />
                </Container>
            </Header>
            <Drawer
                opened={opened}
                onClose={() => toggleOpened(false)}
                styles={(theme) => ({
                    root: {
                        [theme.fn.largerThan('xs')]: {
                            display: 'none'
                        }
                    }
                })}
                closeOnClickOutside
            >
                <Stack
                    spacing='xs'
                    className={classes.burger}
                    align='flex-start'
                >
                    {items}
                </Stack>
            </Drawer>
        </>
    );
};

export default AppHeader;