import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    linkItem: {
        [theme.fn.smallerThan('xs')]: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    aTag: {
        [theme.fn.smallerThan('xs')]: {
            width: '100%'
        },
    }
}));