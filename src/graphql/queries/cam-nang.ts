import { ApolloClient, gql, NormalizedCacheObject, useQuery } from '@apollo/client';
import { AllCamNangs, AllCamNangsVars, CamNangBySlug } from '../../types';

const ALL = gql`
    query AllCamNangs($page: Int!, $limit: Int!, $search: String) {
        camNang {
            all(page: $page, limit: $limit, search: $search) {
                docs {
                    id
                    tieuDe
                    noiDung
                    slug
                    anhDaiDien
                    createdAt
                }
                pageInfo {
                    page
                    totalPages
                    limit
                }
            }
        }
    }
`;

const BY_SLUG = gql`
    query CamNangBySlug($slug: String!) {
        camNang {
            bySlug(slug: $slug) {
                id
                tieuDe
                noiDung
                slug
                anhDaiDien
                createdAt
            }
        }
    }
`;

const allCamNangVariables = {
    page: 1,
    limit: 10,
    search: ''
};

const getAll = async (
    client: ApolloClient<NormalizedCacheObject>,
) => {
    return client.query<AllCamNangs, AllCamNangsVars>({
        query: ALL,
        variables: allCamNangVariables
    });
};

const getBySlug = async (
    client: ApolloClient<NormalizedCacheObject>,
    slug: string
) => {
    return client.query<
        CamNangBySlug, { slug: string }
    >({
        query: BY_SLUG,
        variables: {
            slug
        }
    });
};

export const camNangService = {
    getAll,
    getBySlug
};

const useAllCamNangs = () => {
    return useQuery<AllCamNangs, AllCamNangsVars>(ALL, {
        variables: allCamNangVariables
    });
};

const useCamNangBySlug = (slug: string) => {
    return useQuery<
        CamNangBySlug, { slug: string }
    >(BY_SLUG, {
        variables: {
            slug
        }
    });
};

export const camNangHooks = {
    useAllCamNangs,
    useCamNangBySlug
};