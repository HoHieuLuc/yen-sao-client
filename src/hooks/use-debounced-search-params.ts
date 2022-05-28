import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { parseString } from '../utils/common';

export const useDebouncedSearchParams = (wait = 200) => {
    const router = useRouter();
    const { query } = router;
    const [search, setSearch] = useState(parseString(query.search));
    const [debouncedSearch] = useDebouncedValue(search.trim(), wait);

    useEffect(() => {
        if (debouncedSearch !== '') {
            delete query.page;            
            void router.replace({
                pathname: router.pathname,
                query: {
                    ...query,
                    search: debouncedSearch,
                }
            }, undefined, { shallow: true });
        } else {
            delete query.search;
            void router.push({
                pathname: router.pathname,
                query,
            }, undefined, { shallow: true });
        }
    }, [debouncedSearch]);

    return {
        search,
        debouncedSearch,
        setSearch,
    };
};