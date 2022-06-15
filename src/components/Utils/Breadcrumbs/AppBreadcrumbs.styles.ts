import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    text: {
        [theme.fn.smallerThan('xs')]: {
            fontSize: theme.fontSizes.xs
        }
    }
}));