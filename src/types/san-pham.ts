import { PageInfo, PaginateVars } from './paginate';

export interface SanPham {
    id: string;
    tenSanPham: string;
    soLuong: number;
    donGiaSi: number;
    donGiaLe: number;
    donGiaTuyChon: string;
    moTa: string;
    xuatXu: string;
    tags: Array<string>;
    anhSanPham: Array<string>;
    isPublic: boolean;
    slug: string;
    createdAt: number;
    updatedAt: number;
}

export interface SanPhamBySlug {
    sanPham: {
        bySlug?: SanPham
    }
}

export interface AllSanPhams {
    sanPham: {
        all: {
            docs: Array<SanPham>;
            pageInfo: PageInfo;
        }
    }
}

export interface AllSanPhamVars extends PaginateVars {
    search: string;
    sort?: string | null;
}