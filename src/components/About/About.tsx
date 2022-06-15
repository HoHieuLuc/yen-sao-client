import useStyles from '../../styles/typography.styles';

import sanitizeHtml from 'sanitize-html';
import { AllPages } from '../../types';

interface Props {
    data: AllPages;
}

const About = ({ data }: Props) => {
    const { classes } = useStyles();

    return (
        <div
            className={classes.rte}
            dangerouslySetInnerHTML={{
                __html: data.page.about
                    ? sanitizeHtml(data.page.about.content.value, {
                        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                        allowedClasses: {
                            '*': ['*']
                        }
                    })
                    : ''
            }}
        />
    );
};

export default About;