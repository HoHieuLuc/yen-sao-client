import useStyles from './SanPhamCard.styles';
import { useRouter } from 'next/router';

import { Badge, Box, Button, Card, Text } from '@mantine/core';
import Image from 'next/image';

import { convertToVND } from '../../../utils/common';
import { SanPham } from '../../../types';

interface Props {
    data: SanPham;
}

const SanPhamCard = ({ data }: Props) => {
    const router = useRouter();
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
                    <Image
                        alt={data.tenSanPham}
                        src={data.anhSanPham[0]}
                        layout='responsive'
                        width='100%'
                        height='100%'
                        objectFit='cover'
                        priority
                        sizes='50vw'
                        onClick={() => void router.push(`/san-pham/${data.slug}`)}
                        className={classes.img}
                    />
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
                weight={500}
                lineClamp={1}
                onClick={() => void router.push(`/san-pham/${data.slug}`)}
                style={{
                    cursor: 'pointer'
                }}
            >
                {data.tenSanPham}
            </Text>
            <Text size='sm'>
                {data.donGiaTuyChon
                    ? <Text size='sm'>
                        {data.donGiaTuyChon}
                    </Text>
                    : <Box>
                        <Text size='sm'>
                            Lẻ: {convertToVND(data.donGiaLe)}/100gram
                        </Text>
                        <Text size='sm'>
                            Sỉ: {convertToVND(data.donGiaSi)}/100gram
                        </Text>
                    </Box>
                }
            </Text>

            <Text
                size='sm'
                style={{ lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: data.moTa }}
                lineClamp={2}
            />

            <Button
                mt='auto'
                variant='light'
                color='blue'
                fullWidth
                onClick={() => void router.push(`/san-pham/${data.slug}`)}
                className='draw'
            >
                Chi tiết
            </Button>
        </Card>
    );
};

export default SanPhamCard;