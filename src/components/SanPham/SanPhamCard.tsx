import { useRouter } from 'next/router';

import { Badge, Box, Button, Card, Image, Text } from '@mantine/core';

import { convertToVND } from '../../utils/common';
import { SanPham } from '../../types';

interface Props {
    data: SanPham;
}

const SanPhamCard = ({ data }: Props) => {
    const router = useRouter();

    return (
        <Card
            shadow='sm'
            p='lg'
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Card.Section style={{ position: 'relative' }}>
                <Image
                    src={data.anhSanPham[0]}
                    height={160}
                    alt={data.tenSanPham}
                />
                <Badge
                    color='pink'
                    variant='light'
                    style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                    }}
                >
                    Đang bán
                </Badge>
            </Card.Section>

            <Text weight={500} lineClamp={1}>{data.tenSanPham}</Text>
            <Text size='sm'>
                Giá/100gram:
                {data.donGiaTuyChon
                    ? <Text size='sm'>
                        {data.donGiaTuyChon}
                    </Text>
                    : <Box>
                        <Text size='sm'>
                            {convertToVND(data.donGiaLe)}(lẻ)
                        </Text>
                        <Text size='sm'>
                            {convertToVND(data.donGiaSi)}(sỉ)
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
                onClick={() => void router.push(`/san-pham/${data.id}`)}
            >
                Xem chi tiết
            </Button>
        </Card>
    );
};

export default SanPhamCard;