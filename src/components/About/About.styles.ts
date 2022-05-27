import { createStyles } from '@mantine/core';

export default createStyles(
    (theme) => ({
        rte: {
            '& .ql-align-center': {
                textAlign: 'center',
                img: {
                    margin: 'auto'
                }
            },
            '& .ql-align-right': {
                textAlign: 'right',
                img: {
                    marginLeft: 'auto',
                }
            },
            '& p, & img, & h1, & h2, & h3, & h4, & h5, & h6': {
                margin: 0
            },
            border: 'none',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            position: 'relative',
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '& .ql-container': {
                position: 'relative',
                boxSizing: 'border-box',
                height: '100%',
                margin: 0,
                lineHeight: theme.lineHeight,
            },

            '& .ql-editor': {
                whiteSpace: 'pre-wrap',
                outline: 'none',
                padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
            },

            '& .ql-container.ql-disabled .ql-tooltip': {
                display: 'none',
            },

            '& .ql-hidden': {
                display: 'none',
            },

            '& .ql-preview': {
                display: 'inline-block',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: 180,
                marginRight: theme.spacing.md,
            },

            '& .ql-clipboard': {
                left: '-100000px',
                height: '1px',
                overflowY: 'hidden',
                position: 'fixed',
                top: '50%',
            },

            '& iframe.ql-video': {
                width: '100%',
                height: 400,

                '@media (max-width: 755px)': {
                    height: 220,
                },
            },

            '& a': {
                color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
                textDecoration: 'none',
            },

            '& ol, & ul': {
                marginTop: theme.spacing.sm,
                paddingLeft: theme.spacing.md * 2,
                listStylePosition: 'outside',
            },

            '& h1': {
                fontSize: theme.headings.sizes.h1.fontSize,
            },

            '& h2': {
                fontSize: theme.headings.sizes.h2.fontSize,
            },

            '& h3': {
                fontSize: theme.headings.sizes.h3.fontSize,
            },

            '& h4': {
                fontSize: theme.headings.sizes.h4.fontSize,
            },

            '& h5': {
                fontSize: theme.headings.sizes.h5.fontSize,
            },

            '& h6': {
                fontSize: theme.headings.sizes.h6.fontSize,
            },


            '& pre': {
                lineHeight: theme.lineHeight,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                backgroundColor: theme.fn.rgba(
                    theme.fn.themeColor('gray', theme.colorScheme === 'dark' ? 8 : 0),
                    theme.colorScheme === 'dark' ? 0.35 : 1
                ),
                fontFamily: theme.fontFamilyMonospace,
                fontSize: theme.fontSizes.xs,
                padding: theme.spacing.xs,
                margin: 0,
                overflowX: 'auto',
            },

            '& code': {
                lineHeight: theme.lineHeight,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                backgroundColor: theme.fn.rgba(
                    theme.fn.themeColor('gray', theme.colorScheme === 'dark' ? 8 : 0),
                    theme.colorScheme === 'dark' ? 0.35 : 1
                ),
                fontFamily: theme.fontFamilyMonospace,
                fontSize: theme.fontSizes.xs,
                padding: `2px ${theme.spacing.xs / 2}px`,
            },

            '& blockquote': {
                marginTop: 0,
                marginLeft: 0,
                marginBottom: theme.spacing.sm,
                paddingLeft: theme.spacing.md,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
                borderLeft: `
                4px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
            },

            '& img': {
                display: 'block',
                position: 'relative',
                maxWidth: '100%',
                marginBottom: theme.spacing.sm,
            },

            '& .ql-image-uploading img': {
                filter: 'blur(10px)',
            },

            '& .ql-blank': {
                '&::before': {
                    content: 'attr(data-placeholder)',
                    position: 'absolute',
                    left: theme.spacing.md,
                    right: theme.spacing.md,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
                },
            },

        }
    })
);