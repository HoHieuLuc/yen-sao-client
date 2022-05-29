import { useRouter } from 'next/router';
import useStyles from './FeaturedSanPhamDetails.styles';

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
    const { classes } = useStyles({ index });

    return (
        <Box>
            <Grid m='xs'>
                <Grid.Col
                    md={6}
                    className={classes.imgCol}
                >
                    <Image
                        alt='Ảnh sản phẩm'
                        src={data.anhSanPham[0]}
                        layout='responsive'
                        width={200}
                        height={128}
                        priority
                        style={{
                            borderRadius: 10,
                            cursor: 'pointer',
                        }}
                        objectFit='cover'
                        sizes='30vw'
                        onClick={() => void router.push(`/san-pham/${data.slug}`)}
                    />
                </Grid.Col>
                <Grid.Col md={6}>
                    <Center style={{ width: '100%', height: '100%' }}>
                        <Box>
                            <Center>
                                <Text
                                    className={classes.title}
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
                                className={classes.description}
                                dangerouslySetInnerHTML={{
                                    __html: data.moTa
                                }}
                            />
                            {data.donGiaTuyChon
                                ? <Center>
                                    <Text
                                        className={classes.retailPrice}
                                    >
                                        {data.donGiaTuyChon}
                                    </Text>
                                </Center>
                                :
                                <>
                                    <Center>
                                        <Text>
                                            <span
                                                className={classes.retailPrice}
                                            >
                                                {convertToVND(data.donGiaLe)}
                                            </span>
                                            /100gram (lẻ)
                                        </Text>
                                    </Center>
                                    <Center>
                                        <Text>
                                            <span
                                                className={classes.wholesalePrice}
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
        </Box >
    );
};

export default FeaturedSanPhamDetails;