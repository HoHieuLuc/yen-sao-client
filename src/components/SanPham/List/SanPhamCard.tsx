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

    return (
        <Card
            shadow='sm'
            p='xs'
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
            withBorder
        >
            <Card.Section>
                <div style={{ position: 'relative' }}>
                    <Image
                        alt='Ảnh sản phẩm'
                        src={data.anhSanPham[0]}
                        layout='responsive'
                        width='100%'
                        height='100%'
                        objectFit='cover'
                        priority
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
                </div>
            </Card.Section>

            <Text weight={500} lineClamp={1}>{data.tenSanPham}</Text>
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
            >
                Chi tiết
            </Button>
        </Card>
    );
};

export default SanPhamCard;