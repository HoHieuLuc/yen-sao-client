import FeaturedSanPhamDetails from './FeaturedSanPhamDetails';
import { Box } from '@mantine/core';

import { sanPhamHooks } from '../../../graphql/queries';

const FeaturedSanPham = () => {
    const { data } = sanPhamHooks.useFeaturedSanPhams();

    return (
        <>
            {data && <Box>
                {data.sanPham.all.docs.map((sanPham, index) => (
                    <FeaturedSanPhamDetails
                        key={sanPham.id}
                        data={sanPham}
                        index={index} />
                ))}
            </Box>}
        </>
    );
};

export default FeaturedSanPham;