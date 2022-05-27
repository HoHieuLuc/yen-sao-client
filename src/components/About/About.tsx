import useStyles from './About.styles';

import { AllPage } from '../../types';

interface Props {
    data: AllPage;
}

const About = ({ data }: Props) => {
    const { classes } = useStyles();

    return (
        <div
            className={classes.rte}
            dangerouslySetInnerHTML={{
                __html: data.page.about ? data.page.about.content.value : ''
            }}
        />
    );
};

export default About;