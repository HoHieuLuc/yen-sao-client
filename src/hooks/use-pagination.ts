import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { parseNumber } from '../utils/common';

export const usePagination = () => {
    const router = useRouter();
    const { query } = router;
    const currentPage = parseNumber(query.page, 1);

    useEffect(() => {
        if (currentPage === 1) {
            delete query.page;
            void router.replace(
                {
                    pathname: router.pathname,
                    query,
                },
                undefined,
                {
                    shallow: true
                }
            );
        }
    }, []);

    const handlePageChange = (page: number) => {
        void router.push(
            {
                pathname: router.pathname,
                query: {
                    ...query,
                    page,
                }
            },
            undefined,
            {
                scroll: false,
                shallow: true
            }
        );
    };

    return {
        currentPage,
        handlePageChange,
    };
};