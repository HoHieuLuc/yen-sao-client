import { createStyles } from '@mantine/core';

export default createStyles(
    () => ({
        rte: {
            '.ql-align-center': {
                img: {
                    margin: 'auto'
                }
            },
            '.ql-align-right': {
                img: {
                    marginLeft: 'auto',
                }
            },
            [`p, img, h1, h2, h3, h4, h5`]: {
                margin: 0
            },
            border: 'none'
        }
    })
);