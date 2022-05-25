import useStyles from './About.styles';

import { Center, Spoiler, Title } from '@mantine/core';

import { AllPage } from '../../types';

interface Props {
    data: AllPage;
}

const About = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <Spoiler
            maxHeight={120}
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
            <Center>
                <Title>Giới thiệu</Title>
            </Center>
            <div
                className={classes.rte}
                dangerouslySetInnerHTML={{
                    __html: data.page.about.content.value
                }}
            />
        </Spoiler>
    );
};

export default About;