import { ApolloClient, gql, NormalizedCacheObject, useQuery } from '@apollo/client';
import {
    AllSanPhams,
    SanPhamBySlug,
    SearchSanPhamVars,
} from '../../types';

const ALL = gql`
    query AllSanPhams($page: Int!, $limit: Int!, $search: String, $sort: SortSanPham) {
        sanPham {
            all(page: $page, limit: $limit, search: $search, sort: $sort) {
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

const getAll = async (
    client: ApolloClient<NormalizedCacheObject>,
    variables: SearchSanPhamVars
) => {
    return client.query<AllSanPhams, SearchSanPhamVars>({
        query: ALL,
        variables
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

const useAllSanPhams = (variables: SearchSanPhamVars) => {
    return useQuery<
        AllSanPhams, SearchSanPhamVars
    >(ALL, {
        variables
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