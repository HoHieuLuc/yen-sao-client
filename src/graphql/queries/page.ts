import { ApolloClient, gql, NormalizedCacheObject, useQuery } from '@apollo/client';
import { AllPages } from '../../types/page';

const ALL = gql`
    query AllPages {
        page {
            about: byName(name: "about") {
                id
                name
                content
            }
            websiteInfo: byName(name: "websiteInfo") {
                id
                name
                content
            }
        }
    }
`;

const getAll = async (client: ApolloClient<NormalizedCacheObject>) => {
    return client.query<AllPages>({
        query: ALL
    });
};

export const pageService = {
    getAll
};

const useAllPages = () => {
    return useQuery<
        AllPages
    >(ALL);
};

export const pageHooks = {
    useAllPages
};