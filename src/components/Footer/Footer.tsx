import useStyles from './Footer.styles';

import { Text, Container, Grid, Box } from '@mantine/core';
import Image from 'next/image';

import { AllPages } from '../../types';


interface Props {
    data: AllPages;
}

const AppFooter = ({ data }: Props) => {
    const { classes } = useStyles();
    const addresses = data.page.websiteInfo ? (data.page.websiteInfo.content.address || []) : [];
    const phones = data.page.websiteInfo ? (data.page.websiteInfo.content.phone || []) : [];

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
                            {addresses.length > 0
                                ? addresses.map(
                                    (item, index) => (
                                        <Text key={`${item}:${index}`}>{item}</Text>
                                    ))
                                : 'Địa chỉ chưa được cập nhật'
                            }
                        </Grid.Col>
                        <Grid.Col span={4} md={2}>Số điện thoại:</Grid.Col>
                        <Grid.Col span={8} md={10}>
                            {phones.length > 0
                                ? phones.map(
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