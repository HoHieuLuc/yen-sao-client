import { Center, Grid, Title, Box } from '@mantine/core';

import { convertToVND } from '../../../utils/common';
import { SanPham } from '../../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper';
interface Props {
    data: SanPham
}

const SanPhamDetails = ({ data }: Props) => {
    return (
        <Grid>
            <Grid.Col md={6}>
                <Swiper
                    spaceBetween={50}
                    effect='coverflow'
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView='auto'
                    modules={[Navigation, Pagination, A11y, EffectCoverflow]}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                >
                    {data.anhSanPham.map((anh, index) => (
                        <SwiperSlide key={`${anh}:${index}`}>
                            <Image
                                alt='Ảnh sản phẩm'
                                src={anh}
                                layout='responsive'
                                width={200}
                                height={128}
                                priority
                                style={{
                                    borderRadius: 10
                                }}
                                objectFit='scale-down'
                                sizes='30vw'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Grid.Col>
            <Grid.Col md={6}>
                <Center>
                    <Title>{data.tenSanPham}</Title>
                </Center>
                <Box>{data.donGiaTuyChon
                    ? data.donGiaTuyChon
                    : <>
                        <Box>
                            Lẻ: {convertToVND(data.donGiaLe)}/100gram
                        </Box>
                        <Box>
                            Sỉ: {convertToVND(data.donGiaSi)}/100gram
                        </Box>
                    </>
                }
                </Box>
            </Grid.Col>
        </Grid >
    );
};

export default SanPhamDetails;