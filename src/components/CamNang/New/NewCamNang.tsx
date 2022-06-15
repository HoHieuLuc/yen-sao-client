import { Box, Grid, Text } from '@mantine/core';
import NewCamNangItem from './NewCamNangItem';
import Link from 'next/link';

import { camNangHooks } from '../../../graphql/queries';

const NewCamNang = () => {
    const { data } = camNangHooks.useAllCamNangs({
        page: 1,
        limit: 4,
        search: ''
    });
    return (
        <Box>
            <Text
                size='xl'
                weight={700}
                variant='gradient'
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                transform='uppercase'
                align='center'
            >
                Cẩm nang mới
            </Text>
            {data &&
                <Grid gutter='xs'>
                    {data.camNang.all.docs.map(camNang => (
                        <NewCamNangItem
                            key={camNang.id}
                            data={camNang}
                        />
                    ))}
                </Grid>
            }
            <Text
                size='xl'
                weight={700}
                variant='gradient'
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                align='right'
                sx={{
                    fontStyle: 'italic',
                    cursor: 'pointer'
                }}
            >
                <Link href='/cam-nang'>
                    <a>
                        Xem tất cả
                    </a>
                </Link>
            </Text>
        </Box>
    );
};

export default NewCamNang;