import { createStyles } from '@mantine/core';

interface StyleParams {
    index: number;
}

export default createStyles((theme, { index }: StyleParams) => ({
    imgCol: {
        [theme.fn.largerThan('md')]: {
            order: index % 2 === 0 ? 0 : 1,
        },
        transition: 'transform 0.5s ease-in-out',
        '&:hover': {
            [theme.fn.largerThan('xl')]: {
                transform: `perspective(40rem) rotate3d(0, 1, 0, 
                    ${index % 2 === 0 ? '3' : '-3'}deg)`,
            },
            [theme.fn.smallerThan('xl')]: {
                transform: `perspective(40rem) rotate3d(0, 1, 0, 
                    ${index % 2 === 0 ? '20' : '-20'}deg)`,
            },
            zIndex: 10
        }
    },
    title: {
        fontSize: '5vh',
        cursor: 'pointer'
    },
    description: {
        fontSize: '3vh'
    },
    retailPrice: {
        fontSize: '4vh',
        background: `linear-gradient(to right, purple 50%, blue 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
    },
    wholesalePrice: {
        fontSize: '4vh',
        background: `linear-gradient(to right, red 0%, #330867 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
    }
}));