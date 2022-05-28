import { ApolloClient, gql, NormalizedCacheObject, useQuery } from '@apollo/client';
import { AllPages } from '../../types/page';

const page = `
    id
    name
    content
`;

const ALL = gql`
    query AllPages {
        page {
            about: byName(name: "about") {
                ${page}
            }
            websiteInfo: byName(name: "websiteInfo") {
                ${page}
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