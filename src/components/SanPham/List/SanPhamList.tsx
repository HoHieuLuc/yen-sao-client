import { useDebouncedSearchParams } from '../../../hooks/use-debounced-search-params';
import { usePagination } from '../../../hooks';

import { Center, Grid, Pagination, Stack, TextInput } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import SanPhamCard from './SanPhamCard';

import { sanPhamHooks } from '../../../graphql/queries';

const SanPhamList = () => {
    const { currentPage, handlePageChange } = usePagination();
    const { debouncedSearch, search, setSearch } = useDebouncedSearchParams();
    const { data, loading } = sanPhamHooks.useAllSanPhams({
        page: currentPage,
        limit: 12,
        search: debouncedSearch
    });

    const sanPhamElements = data?.sanPham.all.docs.map(sanPham => (
        <Grid.Col
            key={sanPham.id}
            span={6}
            xs={6}
            sm={4}
            md={3}
            xl={2}
            sx={(theme) => ({
                [theme.fn.smallerThan('md')]: {
                    padding: 5
                }
            })}
        >
            <SanPhamCard data={sanPham} />
        </Grid.Col>
    ));

    return (
        <Stack spacing='xs'>
            <TextInput
                label='Tìm kiếm'
                placeholder='Tìm kiếm'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <LoadingWrapper loading={loading}>
                <Stack spacing='xs'>
                    {sanPhamElements?.length === 0 && (
                        <Center>
                            Không tìm thấy sản phẩm nào {debouncedSearch
                                && `cho từ khóa "${debouncedSearch}"`}
                        </Center>
                    )}
                    <Grid>
                        {sanPhamElements}
                    </Grid>
                    <Center>
                        {data && <Pagination
                            page={currentPage}
                            total={data.sanPham.all.pageInfo.totalPages}
                            onChange={handlePageChange}
                            styles={(theme) => ({
                                item: {
                                    border: 'none',
                                    backgroundColor: theme.colorScheme,
                                    [`&:hover`]: {
                                        backgroundColor: theme.colors.gray[1],
                                    }
                                },
                                active: {
                                    color: 'black',
                                    backgroundColor: theme.colors.gray[1],
                                    pointerEvents: 'none',
                                }
                            })}
                        />}
                    </Center>
                </Stack>
            </LoadingWrapper>
        </Stack>
    );
};

export default SanPhamList;