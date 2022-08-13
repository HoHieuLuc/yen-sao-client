import { ApolloClient, gql, NormalizedCacheObject, useQuery } from '@apollo/client';
import {
    AllSanPhams,
    SanPhamBySlug,
    AllSanPhamVars,
} from '../../types';

const ALL = gql`
    query AllSanPhams($page: Int!, $limit: Int!, $search: String) {
        sanPham {
            all(page: $page, limit: $limit, search: $search) {
                docs {
                    id
                    tenSanPham
                    soLuong
                    anhSanPham
                    moTa
                    donGiaSi
                    donGiaLe
                    donGiaTuyChon
                    slug
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

const FEATURED = gql`
    query AllFeaturedSanPhams {
        sanPham {
            all(page: 1, limit: 3, isFeatured: true) {
                docs {
                    id
                    tenSanPham
                    soLuong
                    anhSanPham
                    moTa
                    donGiaSi
                    donGiaLe
                    donGiaTuyChon
                    slug
                }
            }
        }
    }
`;

const BY_SLUG = gql`
    query SanPhamBySlug($slug: String!) {
        sanPham {
            bySlug(slug: $slug) {
                id
                tenSanPham
                soLuong
                donGiaSi
                donGiaLe
                donGiaTuyChon
                moTa
                xuatXu
                tags
                anhSanPham
                slug
            }
        }
    }
`;

const allSanPhamVariables = {
    page: 1,
    limit: 12,
    search: ''
};

const getAll = async (
    client: ApolloClient<NormalizedCacheObject>
) => {
    return client.query<AllSanPhams, AllSanPhamVars>({
        query: ALL,
        variables: allSanPhamVariables
    });
};

const getFeatured = async (client: ApolloClient<NormalizedCacheObject>) => {
    return client.query<AllSanPhams>({
        query: FEATURED
    });
};

const getBySlug = async (client: ApolloClient<NormalizedCacheObject>, slug: string) => {
    return client.query<
        SanPhamBySlug, { slug: string }
    >({
        query: BY_SLUG,
        variables: { slug }
    });
};


export const sanPhamService = {
    getAll,
    getBySlug,
    getFeatured
};

const useAllSanPhams = () => {
    return useQuery<
        AllSanPhams, AllSanPhamVars
    >(ALL, {
        variables: allSanPhamVariables
    });
};

const useFeaturedSanPhams = () => {
    return useQuery<AllSanPhams>(FEATURED);
};

const useSanPhamBySlug = (slug: string) => {
    return useQuery<
        SanPhamBySlug, { slug: string }
    >(BY_SLUG, {
        variables: {
            slug
        }
    });
};


export const sanPhamHooks = {
    useAllSanPhams,
    useSanPhamBySlug,
    useFeaturedSanPhams,
};