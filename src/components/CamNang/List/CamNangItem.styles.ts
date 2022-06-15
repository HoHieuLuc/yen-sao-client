import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    img: {
        borderRadius: `${theme.radius.xs}px 0 0 ${theme.radius.xs}px`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.2)',
            filter: 'brightness(70%)',
        },
    }
}));