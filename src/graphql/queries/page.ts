import { ApolloClient, gql, NormalizedCacheObject, useQuery } from '@apollo/client';
import { AllPage } from '../../types/page';

const ALL = gql`
    query AllPages {
        page {
            about: byName(name: "about") {
                id
                name
                content
            }
            address: byName(name: "address") {
                id
                name
                content
            }
            phone: byName(name: "phone") {
                id
                name
                content
            }
        }
    }
`;

const getAll = async (client: ApolloClient<NormalizedCacheObject>) => {
    return client.query<AllPage>({
        query: ALL
    });
};

export const pageService = {
    getAll
};

const useAllPages = () => {
    return useQuery<
        AllPage
    >(ALL);
};

export const pageHooks = {
    useAllPages
};