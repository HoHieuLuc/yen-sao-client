import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { NavigationProgress, resetNavigationProgress, startNavigationProgress } from '@mantine/nprogress';

const RouterTransition = () => {
    const router = useRouter();
    // super dirty hack (for now)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => {
            if (url !== router.asPath) {
                setLoading(true);
                startNavigationProgress();
            }
            //return url !== router.asPath && startNavigationProgress();
        };
        const handleComplete = () => {
            setLoading(false);
            return resetNavigationProgress();
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router.asPath]);

    return loading
        ? <NavigationProgress />
        : <NavigationProgress zIndex={-99999} />;
};

export default RouterTransition;