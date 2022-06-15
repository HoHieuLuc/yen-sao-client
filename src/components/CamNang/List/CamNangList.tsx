import { useDebouncedSearchParams } from '../../../hooks/use-debounced-search-params';
import { usePagination } from '../../../hooks';

import { Center, Pagination, Stack, TextInput } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import CamNangItem from './CamNangItem';

import { camNangHooks } from '../../../graphql/queries';

const CamNangList = () => {
    const { currentPage, handlePageChange } = usePagination();
    const { search, setSearch, debouncedSearch } = useDebouncedSearchParams(300);
    const { data, loading } = camNangHooks.useAllCamNangs({
        page: currentPage,
        limit: 10,
        search: debouncedSearch
    });
    return (
        <Stack spacing='xs'>
            <TextInput
                label='Tìm kiếm'
                placeholder='Tìm kiếm'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <LoadingWrapper loading={loading}>
                {data && <Stack spacing='xs'>
                    {data.camNang.all.docs.length === 0 && (
                        <Center>
                            Không tìm thấy cẩm nang nào {debouncedSearch
                                && `cho từ khóa "${debouncedSearch}"`}
                        </Center>
                    )}
                    {data.camNang.all.docs.map(camNang => (
                        <CamNangItem
                            key={camNang.id}
                            data={camNang}
                        />
                    ))}
                    <Center>
                        <Pagination
                            page={currentPage}
                            total={data.camNang.all.pageInfo.totalPages}
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
                        />
                    </Center>
                </Stack>}
            </LoadingWrapper>
        </Stack>
    );
};

export default CamNangList;