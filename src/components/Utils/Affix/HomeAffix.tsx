import { useWindowScroll } from '@mantine/hooks';
import AppAffix from './AppAffix';

const HomeAffix = () => {
    const [, scrollTo] = useWindowScroll();

    return (
        <AppAffix 
            onClick={() => scrollTo({ y: 0 })}
            label='Lên đầu trang'
            variant='gradient'
            gradient={{ from: 'red', to: 'orange', deg: 90 }}
        />
    );
};

export default HomeAffix;