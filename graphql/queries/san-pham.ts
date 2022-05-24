import { gql, useQuery } from '@apollo/client';
import {
    AllSanPhams,
    SanPhamByID,
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
                    donGiaSi
                    donGiaLe
                    donGiaTuyChon
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

const BY_ID = gql`
    query SanPhamByID($id: ObjectID!) {
        sanPham {
            byID(id: $id) {
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
                isPublic
                createdAt
                updatedAt
            }
        }
    }
`;

const useAllSanPham = (variables: SearchSanPhamVars) => {
    return useQuery<
        AllSanPhams, SearchSanPhamVars
    >(ALL, {
        variables
    });
};

const useSanPhamByID = (id: string) => {
    return useQuery<
        SanPhamByID, { id: string }
    >(BY_ID, {
        variables: {
            id: id
        }
    });
};


export const sanPhamHooks = {
    useSanPhamByID,
    useAllSanPham,
};