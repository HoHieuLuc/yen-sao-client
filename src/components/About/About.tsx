import useStyles from './About.styles';

import { Spoiler } from '@mantine/core';

import { AllPage } from '../../types';
import RichText from '../Utils/RichText/RichText';

interface Props {
    data: AllPage;
}

const About = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <Spoiler
            maxHeight={200}
            showLabel='Xem thêm'
            hideLabel='Thu gọn'
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
            <RichText
                value={data.page.about ? data.page.about.content.value : ''}
                onChange={() => void (0)}
                readOnly
                className={classes.rte}
            />
        </Spoiler>
    );
};

export default About;