import useStyles from './About.styles';

import { Spoiler } from '@mantine/core';

import sanitizeHtml from 'sanitize-html';
import { AllPages } from '../../types';

interface Props {
    data: AllPages;
}

const About = ({ data }: Props) => {
    const { classes } = useStyles();

    return (
        <Spoiler
            showLabel='Xem thêm'
            hideLabel='Ẩn bớt'
            maxHeight={300}
            styles={{
                control: {
                    justifyContent: 'center'
                },
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                }
            }}
        >
            <div
                className={classes.rte}
                dangerouslySetInnerHTML={{
                    __html: data.page.about
                        ? sanitizeHtml(data.page.about.content.value, {
                            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
                            allowedClasses: {
                                '*': ['*']
                            }
                        })
                        : ''
                }}
            />
        </Spoiler>
    );
};

export default About;