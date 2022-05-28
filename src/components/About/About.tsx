import useStyles from './About.styles';

import { AllPages } from '../../types';
import { Spoiler } from '@mantine/core';

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
                    __html: data.page.about ? data.page.about.content.value : ''
                }}
            />
        </Spoiler>
    );
};

export default About;