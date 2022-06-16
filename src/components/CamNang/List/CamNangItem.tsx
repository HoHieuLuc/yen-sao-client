import useTypographyStyles from '../../../styles/typography.styles';
import useStyles from './CamNangItem.styles';

import { Grid, Paper, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import { convertToVietnameseDate } from '../../../utils/common';
import { CamNang } from '../../../types';

interface Props {
    data: CamNang;
}

const CamNangItem = ({ data }: Props) => {
    const typographyStyles = useTypographyStyles();
    const { classes } = useStyles();

    return (
        <Paper radius='xs' shadow='md'>
            <Grid>
                <Grid.Col span={4} md={3}>
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
                <Grid.Col span={8} md={9} p={20}>
                    <Link href={`/cam-nang/${data.slug}`}>
                        <a>
                            <Text
                                weight={700}
                                lineClamp={1}
                                size='xl'
                                color='blue'
                            >
                                {data.tieuDe}
                            </Text>
                        </a>
                    </Link>
                    <Text color='dimmed'>
                        Ngày đăng: {convertToVietnameseDate(data.createdAt)}
                    </Text>
                    <Text
                        lineClamp={2}
                        dangerouslySetInnerHTML={{
                            __html: data.noiDung
                        }}
                        className={typographyStyles.classes.rte}
                        sx={{
                            maxHeight: '3em'
                        }}
                    />
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default CamNangItem;