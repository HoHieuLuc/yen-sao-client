import useStyles from './NewCamNangItem.styles';

import { Grid, Paper, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import { convertToVietnameseDate } from '../../../utils/common';
import { CamNang } from '../../../types';

interface Props {
    data: CamNang;
}

const NewCamNangItem = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <Grid.Col span={12} md={3}>
            <Paper className={classes.item} withBorder radius='lg'>
                <Grid>
                    <Grid.Col span={3} md={12}>
                        <Link href={`/cam-nang/${data.slug}`}>
                            <a>
                                <Image
                                    alt={data.tieuDe}
                                    src={data.anhDaiDien}
                                    layout='responsive'
                                    width='100%'
                                    height='100%'
                                    objectFit='cover'
                                    priority
                                    sizes='25vw'
                                    className={classes.img}
                                />
                            </a>
                        </Link>
                    </Grid.Col>
                    <Grid.Col span={9} md={12} p={20}>
                        <Text
                            weight={700}
                            lineClamp={1}
                            sx={{
                                cursor: 'pointer'
                            }}
                        >
                            <Link href={`/cam-nang/${data.slug}`}>
                                <a>
                                    {data.tieuDe}
                                </a>
                            </Link>
                        </Text>
                        <Text color='dimmed'>
                            Ngày đăng: {convertToVietnameseDate(data.createdAt)}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Grid.Col>
    );
};

export default NewCamNangItem;