import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import { Grid, Stack, Text } from '@mantine/core';
import SanPhamCard from '../List/SanPhamCard';

import { sanPhamHooks } from '../../../graphql/queries';

const SanPhamAside = () => {
    const { data, loading } = sanPhamHooks.useFeaturedSanPhams();

    return (
        <Stack spacing='xs'>
            <Text
                weight={700}
                size='xl'
                variant='gradient'
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            >
                Sản phẩm nổi bật
            </Text>
            <LoadingWrapper loading={loading}>
                <Grid>
                    {data && data.sanPham.all.docs.map(sanPham => (
                        <Grid.Col
                            key={sanPham.id}
                            span={6}
                            md={12}
                        >
                            <SanPhamCard
                                data={sanPham}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </LoadingWrapper>
        </Stack>
    );
};

export default SanPhamAside;