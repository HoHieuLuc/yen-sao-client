import { ApolloClient, gql, NormalizedCacheObject, useQuery } from '@apollo/client';
import { AllPage } from '../../types/page';

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
            address: byName(name: "address") {
                ${page}
            }
            phone: byName(name: "phone") {
                ${page}
            }
            facebook: byName(name: "facebook") {
                ${page}
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