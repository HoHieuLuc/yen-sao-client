import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.radius.md,
    },
    img: {
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.2)',
            filter: 'brightness(70%)',
        },
    },
    badge: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
}));