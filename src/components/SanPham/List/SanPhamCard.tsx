import useStyles from './SanPhamCard.styles';

import { Badge, Box, Button, Card, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import { convertToVND } from '../../../utils/common';
import { SanPham } from '../../../types';

interface Props {
    data: SanPham;
}

const SanPhamCard = ({ data }: Props) => {
    const { classes } = useStyles();

    return (
        <Card
            shadow='sm'
            p='xs'
            className={classes.card}
            withBorder
        >
            <Card.Section>
                <div style={{ position: 'relative' }}>
                    <Link href={`/san-pham/${data.slug}`}>
                        <a>
                            <Image
                                alt={data.tenSanPham}
                                src={data.anhSanPham[0]}
                                layout='responsive'
                                width='100%'
                                height='100%'
                                objectFit='cover'
                                priority
                                sizes='50vw'
                                className={classes.img}
                            />
                        </a>
                    </Link>
                    <Badge
                        color='pink'
                        variant='light'
                        className={classes.badge}
                    >
                        Đang bán
                    </Badge>
                </div>
            </Card.Section>

            <Text
                weight={700}
                lineClamp={1}
                size='lg'
            >
                <Link href={`/san-pham/${data.slug}`}>
                    <a>
                        {data.tenSanPham}
                    </a>
                </Link>
            </Text>
            <Text size='sm'>
                {data.donGiaTuyChon
                    ? <Text className={classes.price} weight={500}>
                        {data.donGiaTuyChon}
                    </Text>
                    : <Box>
                        <Text className={classes.price} weight={500}>
                            Lẻ: {convertToVND(data.donGiaLe)}/100gram
                        </Text>
                        <Text className={classes.price} weight={500}>
                            Sỉ: {convertToVND(data.donGiaSi)}/100gram
                        </Text>
                    </Box>
                }
            </Text>

            <Text
                size='sm'
                sx={{ lineHeight: 1.5, maxHeight: '5em' }}
                dangerouslySetInnerHTML={{ __html: data.moTa }}
                lineClamp={2}
            />
            <Box mt='auto'>
                <Link href={`/san-pham/${data.slug}`}>
                    <a>
                        <Button
                            variant='light'
                            color='blue'
                            fullWidth
                            className='draw'
                        >
                            Chi tiết
                        </Button>
                    </a>
                </Link>
            </Box>
        </Card>
    );
};

export default SanPhamCard;