import { useRouter } from 'next/router';

import { Box, Center, Divider, Grid, Text } from '@mantine/core';
import Image from 'next/image';

import { convertToVND } from '../../../utils/common';
import { SanPham } from '../../../types';

interface Props {
    data: SanPham;
    index: number;
}

const FeaturedSanPhamDetails = ({ data, index }: Props) => {
    const router = useRouter();

    return (
        <Box>
            <Grid m='xs'>
                <Grid.Col
                    md={6}
                    style={{
                        order: index % 2 === 0 ? 0 : 1,

                    }}
                >
                    <Image
                        alt='Ảnh sản phẩm'
                        src={data.anhSanPham[0]}
                        layout='responsive'
                        width={200}
                        height={128}
                        priority
                        style={{
                            borderRadius: 10
                        }}
                        objectFit='cover'
                        sizes='30vw'
                    />
                </Grid.Col>
                <Grid.Col md={6}>
                    <Center style={{ width: '100%', height: '100%' }}>
                        <Box>
                            <Center>
                                <Text
                                    style={{
                                        fontSize: '5vh',
                                        cursor: 'pointer'
                                    }}
                                    weight={700}
                                    variant='gradient'
                                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                    onClick={() => void router.push(`/san-pham/${data.slug}`)}
                                >
                                    {data.tenSanPham}
                                </Text>
                            </Center>
                            <Text
                                lineClamp={2}
                                style={{
                                    fontSize: '3vh'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: data.moTa
                                }}
                            />
                            {data.donGiaTuyChon
                                ? <Center>
                                    <Text
                                        style={{
                                            fontSize: '4vh',
                                            background: `linear-gradient(to right, purple 50%, blue 100%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {data.donGiaTuyChon}
                                    </Text>
                                </Center>
                                :
                                <>
                                    <Center>
                                        <Text>
                                            <span
                                                style={{
                                                    fontSize: '4vh',
                                                    background: `linear-gradient(to right, purple 50%, blue 100%)`,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }}
                                            >
                                                {convertToVND(data.donGiaLe)}
                                            </span>
                                            /100gram (lẻ)
                                        </Text>
                                    </Center>
                                    <Center>
                                        <Text>
                                            <span
                                                style={{
                                                    fontSize: '4vh',
                                                    background: `linear-gradient(to right, red 0%, #330867 100%)`,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }}
                                            >
                                                {convertToVND(data.donGiaSi)}
                                            </span>
                                            /100gram (sỉ)
                                        </Text>
                                    </Center>
                                </>
                            }
                        </Box>
                    </Center>
                </Grid.Col>
            </Grid>
            <Divider />
        </Box>
    );
};

export default FeaturedSanPhamDetails;