import { AllPage } from '../../types';

interface Props {
    data: AllPage;
}

const About = ({ data }: Props) => {
    return (
        <div>
            {data.page.about.content.value}
            {Array.from({ length: 50 }, (_v, i) => <br key={i} />)}
        </div>
    );
};

export default About;