import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    item: {
        borderRadius: theme.radius.sm
    },
    img: {
        [theme.fn.largerThan('md')]: {
            borderRadius: `${theme.radius.xs}px ${theme.radius.xs}px 0 0`
        },
        [theme.fn.smallerThan('md')]: {
            borderRadius: `${theme.radius.xs}px 0 0 ${theme.radius.xs}px`
        },
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.2)',
            filter: 'brightness(70%)',
        },
    }
}));