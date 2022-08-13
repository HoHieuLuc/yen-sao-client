import { Grid, Stack, Text } from '@mantine/core';
import SanPhamCard from '../List/SanPhamCard';

import { sanPhamHooks } from '../../../graphql/queries';

const SanPhamAside = () => {
    const { data } = sanPhamHooks.useFeaturedSanPhams();

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
            <Grid>
                {data && data.sanPham.all.docs.map(sanPham => (
                    <Grid.Col
                        key={sanPham.id}
                        span={6}
                        md={12}
                        sx={(theme) => ({
                            [theme.fn.smallerThan('md')]: {
                                padding: 5
                            }
                        })}
                    >
                        <SanPhamCard
                            data={sanPham}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Stack>
    );
};

export default SanPhamAside;