import useStyles from './Footer.styles';

import { Text, Container, Grid, Box } from '@mantine/core';
import Image from 'next/image';

import { AllPage } from '../../types';


interface Props {
    data: AllPage;
}

const AppFooter = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <Box className={classes.footer}>
            <Container className={classes.inner}>
                <div style={{ width: '4rem', height: '4rem' }}>
                    <Image
                        alt='logo'
                        src='/logo.png'
                        layout='responsive'
                        width='100%'
                        height='100%'
                        objectFit='scale-down'
                        sizes='100%'
                    />
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Grid justify='center'>
                        <Grid.Col span={4} md={2}>Địa chỉ:</Grid.Col>
                        <Grid.Col span={8} md={10}>
                            {data.page.address && data.page.address.content.value.length > 0
                                ? data.page.address.content.value.map(
                                    (item, index) => (
                                        <Text key={`${item}:${index}`}>{item}</Text>
                                    ))
                                : 'Địa chỉ chưa được cập nhật'
                            }
                        </Grid.Col>
                        <Grid.Col span={4} md={2}>Số điện thoại:</Grid.Col>
                        <Grid.Col span={8} md={10}>
                            {data.page.phone && data.page.phone.content.value.length > 0
                                ? data.page.phone.content.value.map(
                                    (item, index) => (
                                        <Text key={`${item}:${index}`}>{item}</Text>
                                    ))
                                : 'Số điện thoại chưa được cập nhật'
                            }
                        </Grid.Col>
                    </Grid>
                </div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © {new Date().getFullYear()}. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
};

export default AppFooter;