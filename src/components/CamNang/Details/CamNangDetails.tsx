import useStyles from '../../../styles/typography.styles';

import { Center, Divider, Paper, Text } from '@mantine/core';
import Image from 'next/image';

import { convertToVietnameseDate } from '../../../utils/common';
import { CamNang } from '../../../types';

interface Props {
    data: CamNang;
}

const CamNangDetails = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <Paper withBorder pl='lg' pr='lg' pb='lg'>
            <h1 style={{ marginBottom: 0 }}>{data.tieuDe}</h1>
            <Text color='dimmed'>Ngày đăng {convertToVietnameseDate(data.createdAt)}</Text>
            <Center>
                <Image
                    alt={data.tieuDe}
                    src={data.anhDaiDien}
                    width={500}
                    height={300}
                    objectFit='scale-down'
                    priority
                />
            </Center>
            <Divider label='Nội dung cẩm nang' labelPosition='center' />
            <div
                className={classes.rte}
                dangerouslySetInnerHTML={{
                    __html: data.noiDung
                }}
            />
        </Paper>
    );
};

export default CamNangDetails;