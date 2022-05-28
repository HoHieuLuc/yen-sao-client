import useStyles from '../../About/About.styles';

import { Center, Grid, Text, Box, Paper, Stack, Title, Spoiler } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper';
import { convertToVND } from '../../../utils/common';
import { SanPham } from '../../../types';

import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

interface Props {
    data: SanPham
}

const SanPhamDetails = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <Stack p={0}>
            <Grid>
                <Grid.Col
                    md={7}
                    sx={(theme) => ({
                        [theme.fn.largerThan('md')]: {
                            borderRight: `1px solid ${theme.colors.gray[1]}`,
                        }
                    })}
                >
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
                                    alt={data.tenSanPham}
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
                <Grid.Col md={5} p='xl'>
                    <Box>
                        <Text
                            style={{
                                fontSize: '5vh',
                            }}
                            weight={700}
                        >
                            {data.tenSanPham}
                        </Text>
                        {data.donGiaTuyChon
                            ? <Center>
                                <Text
                                    style={{
                                        fontSize: '4vh',
                                    }}
                                >
                                    {data.donGiaTuyChon}
                                </Text>
                            </Center>
                            :
                            <>
                                <Text>
                                    <span
                                        style={{
                                            fontSize: '4vh',
                                            color: '#9e1c1c',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {convertToVND(data.donGiaLe)}
                                    </span>
                                    /100gram (lẻ)
                                </Text>
                                <Text>
                                    <span
                                        style={{
                                            fontSize: '4vh',
                                            color: '#9e1c1c',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {convertToVND(data.donGiaSi)}
                                    </span>
                                    /100gram (sỉ)
                                </Text>
                            </>
                        }
                        {data.xuatXu && <Text>
                            Xuất xứ: {data.xuatXu}
                        </Text>}
                    </Box>
                </Grid.Col>
            </Grid >
            <Paper
                withBorder
                shadow='sm'
                style={{ width: '100%' }}
                p='xs'
            >
                <Center mb='xs'>
                    <Title>Mô tả sản phẩm</Title>
                </Center>
                <Spoiler
                    showLabel='Xem thêm'
                    hideLabel='Ẩn bớt'
                    maxHeight={300}
                    styles={{
                        control: {
                            justifyContent: 'center'
                        },
                        root: {
                            display: 'flex',
                            flexDirection: 'column',
                        }
                    }}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.moTa
                        }}
                        className={classes.rte}
                    />
                </Spoiler>
            </Paper>
        </Stack>
    );
};

export default SanPhamDetails;