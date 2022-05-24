import { gql, useQuery } from '@apollo/client';
import { AllPage } from '../../types/page';
import { addApolloState, initializeApollo } from '../client';

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

const getAllPages = async () => {
    const client = initializeApollo();
    await client.query<AllPage>({
        query: ALL
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return addApolloState(client, {
        props: {}
    });
};

export const pageService = {
    getAllPages
};

const useAllPages = () => {
    return useQuery<
        AllPage
    >(ALL);
};

export const pageHooks = {
    useAllPages
};