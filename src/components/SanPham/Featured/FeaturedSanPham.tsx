import FeaturedSanPhamDetails from './FeaturedSanPhamDetails';

import { sanPhamHooks } from '../../../graphql/queries';

const FeaturedSanPham = () => {
    const { data } = sanPhamHooks.useFeaturedSanPhams();

    return (
        <>
            {data && data.sanPham.all.docs.map((sanPham, index) => (
                <FeaturedSanPhamDetails
                    key={sanPham.id}
                    data={sanPham}
                    index={index}
                />
            ))}
        </>
    );
};

export default FeaturedSanPham;