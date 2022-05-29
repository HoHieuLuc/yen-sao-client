import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { AllSanPhamVars } from '../../types';

const allPagesQuery = `
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
`;

const allProductsQuery = `
    allProducts: sanPham {
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
`;

const IndexPage = gql`
    query IndexPage($page: Int!, $limit: Int!, $search: String) {
        ${allPagesQuery}
        ${allProductsQuery}
        featuredProduct: sanPham {
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

const ProductDetailsPage = gql`
    query ProductDetailsPage($slug: String!, $page: Int!, $limit: Int!, $search: String) {
        ${allPagesQuery}
        ${allProductsQuery}
        productBySlug: sanPham {
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

const getIndexPageData = async (
    client: ApolloClient<NormalizedCacheObject>,
    variables: AllSanPhamVars
) => {
    return client.query<never>({
        query: IndexPage,
        variables
    });
};

const getSanPhamBySlugPageData = async (
    client: ApolloClient<NormalizedCacheObject>,
    variables: AllSanPhamVars & { slug: string }
) => {
    return client.query<never>({
        query: ProductDetailsPage,
        variables
    });
};

export const sharedService = {
    getIndexPageData,
    getSanPhamBySlugPageData
};