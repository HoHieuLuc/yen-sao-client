import { camNangHooks } from '../../../graphql/queries';
import { useState } from 'react';

import { Center, Pagination, Stack, TextInput } from '@mantine/core';
import CamNangItem from './CamNangItem';

import removeAccents from 'remove-accents';

const CamNangList = () => {
    const [currentPage, handlePageChange] = useState(1);
    const [search, setSearch] = useState('');
    const { data } = camNangHooks.useAllCamNangs();
    const limit = 10;

    const dataAfterFilter = data?.camNang.all.docs
        .filter(camNang =>
            removeAccents(
                camNang.tieuDe.toLowerCase()
            ).includes(removeAccents(search.toLowerCase()))
        ) || [];

    return (
        <Stack spacing='xs'>
            <TextInput
                label='Tìm kiếm'
                placeholder='Tìm kiếm'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Stack spacing='xs'>
                {dataAfterFilter.length === 0 && (
                    <Center>
                        Không tìm thấy cẩm nang nào {search
                            && `cho từ khóa "${search}"`}
                    </Center>
                )}
                {dataAfterFilter
                    .slice((currentPage - 1) * limit, currentPage * limit)
                    .map(camNang => (
                        <CamNangItem
                            key={camNang.id}
                            data={camNang}
                        />
                    ))}
                {dataAfterFilter.length / limit > 0 && <Center>
                    <Pagination
                        page={currentPage}
                        total={Math.ceil(dataAfterFilter.length / limit)}
                        onChange={handlePageChange}
                        styles={(theme) => ({
                            item: {
                                border: 'none',
                                backgroundColor: theme.colorScheme,
                                [`&:hover`]: {
                                    backgroundColor: theme.colors.gray[1],
                                },
                                '&[data-active]': {
                                    color: 'black',
                                    backgroundColor: theme.colors.gray[1],
                                    pointerEvents: 'none',
                                }
                            }
                        })}
                    />
                </Center>}
            </Stack>
        </Stack>
    );
};

export default CamNangList;