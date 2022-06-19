import { createStyles, keyframes } from '@mantine/core';

interface StyleParams {
    index: number;
    inView: boolean;
}

const fadeIn = keyframes({
    '0%': {
        opacity: 0,
    },
    '100%': {
        opacity: 1,
    },
});

const fadeOut = keyframes({
    '0%': {
        opacity: 1,
    },
    '100%': {
        opacity: 0,
    },
});

export default createStyles((theme, { index, inView }: StyleParams) => ({
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
    textCol: {
        animation: inView ? `${fadeIn} 0.7s ease-in-out` : `${fadeOut} 0.7s ease-in-out`,
    },
    title: {
        fontSize: theme.fontSizes.xl * 1.7
    },
    description: {
        fontSize: theme.fontSizes.xl,
        maxHeight: '5em'
    },
    retailPrice: {
        fontSize: theme.fontSizes.xl * 1.5,
        background: `linear-gradient(to right, purple 50%, blue 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
    },
    wholesalePrice: {
        fontSize: theme.fontSizes.xl * 1.5,
        background: `linear-gradient(to right, red 0%, #330867 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
    }
}));