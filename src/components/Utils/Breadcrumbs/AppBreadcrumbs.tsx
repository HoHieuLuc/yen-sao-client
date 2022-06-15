import useStyles from './AppBreadcrumbs.styles';

import { Breadcrumbs, Text } from '@mantine/core';
import Link from 'next/link';

interface Props {
    data: Array<{
        title: string,
        href: string,
        disabled?: boolean
    }>
}

const AppBreadcrumbs = ({ data }: Props) => {
    const { classes } = useStyles();

    return (
        <Breadcrumbs separator='→'>
            {data.map((item) => {
                if (item.disabled) {
                    return (
                        <Link href={item.href} key={item.title}>
                            <Text color='dimmed' key={item.title} className={classes.text}>
                                {item.title}
                            </Text>
                        </Link>
                    );
                }
                return (
                    <Link href={item.href} key={item.title}>
                        <a>
                            <Text color='blue' className={classes.text}>
                                {item.title}
                            </Text>
                        </a>
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default AppBreadcrumbs;