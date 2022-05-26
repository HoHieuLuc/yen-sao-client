import { Center, Grid, Title, Box, createStyles } from '@mantine/core';
import ImageGallery from 'react-image-gallery';

import { convertToVND } from '../../utils/common';
import { SanPham } from '../../types';

interface Props {
    data: SanPham
}

const useStyles = createStyles({
    thumb: {
        height: '100%',
        [`span > img`]: {
            height: 'max-content',
            objectFit: 'scale-down'
        }
    }
});

const SanPhamDetails = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <Grid>
            <Grid.Col md={6}>
                <ImageGallery
                    items={data.anhSanPham.map(anh => ({
                        original: anh,
                        thumbnail: anh,
                        originalHeight: 300,
                        thumbnailClass: classes.thumb,
                    }))}
                    disableThumbnailScroll={true}
                />
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
        </Grid>
    );
};

export default SanPhamDetails;