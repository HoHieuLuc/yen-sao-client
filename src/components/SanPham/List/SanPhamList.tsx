import { useState } from 'react';

import { Center, Grid, Pagination, Stack, TextInput } from '@mantine/core';
import SanPhamCard from './SanPhamCard';

import { sanPhamHooks } from '../../../graphql/queries';
import removeAccents from 'remove-accents';

const SanPhamList = () => {
    const [currentPage, handlePageChange] = useState(1);
    const [search, setSearch] = useState('');
    const { data } = sanPhamHooks.useAllSanPhams();
    const limit = 12;

    const dataAfterFilter = data?.sanPham.all.docs
        .filter(sanPham =>
            removeAccents(
                sanPham.tenSanPham.toLowerCase()
            ).includes(removeAccents(search.toLowerCase()))
        ) || [];

    const sanPhamElements = dataAfterFilter.slice((currentPage - 1) * limit, currentPage * limit)
        .map(sanPham => (
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
            <Stack spacing='xs'>
                {dataAfterFilter.length === 0 && (
                    <Center>
                        Không tìm thấy sản phẩm nào {search
                            && `cho từ khóa "${search}"`}
                    </Center>
                )}
                <Grid>
                    {sanPhamElements}
                </Grid>
                {dataAfterFilter.length > 0 && <Center>
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

export default SanPhamList;