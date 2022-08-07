import useStyles from '../../../styles/typography.styles';

import { Center, Grid, Text, Box, Paper, Stack, Spoiler, Badge, Divider } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from '@mantine/carousel';
import Image from 'next/image';

import { convertToVND } from '../../../utils/common';
import { AllPages, SanPham } from '../../../types';


interface Props {
    data: SanPham;
    pageData?: AllPages;
}

const SanPhamDetails = ({ data, pageData }: Props) => {
    const { classes } = useStyles();
    const phones = pageData?.page.websiteInfo?.content.phone;
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
                    <Carousel
                        loop
                        withIndicators
                        styles={() => ({
                            indicator: {
                                width: 12,
                                height: 4,
                                transition: 'width 250ms ease',

                                '&[data-active]': {
                                    width: 40,
                                    border: `1px solid rgba(51, 154, 240, 0.5)`,
                                },
                            },
                            control: {
                                border: `1px solid rgba(51, 154, 240, 0.5)`,
                            }
                        })}
                    >
                        {data.anhSanPham.map((anh, index) => (
                            <Carousel.Slide key={`${anh}:${index}`}>
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
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </Grid.Col>
                <Grid.Col md={5} p='xl'>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }}
                    >
                        <Text
                            sx={(theme) => ({
                                fontSize: theme.fontSizes.xl * 1.7,
                            })}
                            weight={700}
                        >
                            {data.tenSanPham}
                        </Text>
                        <Divider />
                        {data.donGiaTuyChon
                            ? <Text
                                sx={(theme) => ({
                                    fontSize: theme.fontSizes.xl * 1.5,
                                })}
                            >
                                {data.donGiaTuyChon}
                            </Text>
                            : <>
                                <Text>
                                    <Text
                                        sx={(theme) => ({
                                            fontSize: theme.fontSizes.xl * 1.5,
                                            color: '#9e1c1c',
                                        })}
                                        weight={600}
                                        component='span'
                                    >
                                        {convertToVND(data.donGiaLe)}
                                    </Text>
                                    /100gram (lẻ)
                                </Text>
                                <Text>
                                    <Text
                                        sx={(theme) => ({
                                            fontSize: theme.fontSizes.xl * 1.5,
                                            color: '#9e1c1c',
                                        })}
                                        weight={600}
                                        component='span'
                                    >
                                        {convertToVND(data.donGiaSi)}
                                    </Text>
                                    /100gram (sỉ)
                                </Text>
                            </>
                        }
                        {data.xuatXu && <Text>
                            Xuất xứ: {data.xuatXu}
                        </Text>}
                        <Box
                            sx={{
                                marginTop: 'auto'
                            }}
                        >
                            <Divider pb='xs' />
                            {phones && phones.map((phone, index) => (
                                <Badge
                                    key={`${phone}:${index}`}
                                    leftSection={<FontAwesomeIcon icon={faPhone} />}
                                    size='xl'
                                    fullWidth
                                >
                                    {phone}
                                </Badge>
                            ))}
                        </Box>
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
                    <Text
                        sx={(theme) => ({
                            fontSize: theme.fontSizes.xl * 1.5
                        })}
                        weight={700}
                    >
                        Mô tả sản phẩm
                    </Text>
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