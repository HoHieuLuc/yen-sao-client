import useStyles from './Footer.styles';

import { Text, Container, Image, Grid, Box } from '@mantine/core';

import { AllPage } from '../../types';

interface Props {
    data: AllPage;
}

const AppFooter = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <Box className={classes.footer}>
            <Container className={classes.inner}>
                <Image
                    src='/logo.png'
                    alt='logo'
                    fit='contain'
                    width={60}
                />
                <div style={{ marginLeft: 'auto' }}>
                    <Grid justify='center'>
                        <Grid.Col span={2}>Địa chỉ:</Grid.Col>
                        <Grid.Col span={10}>
                            {data.page.address && data.page.address.content.value.length > 0
                                ? data.page.address.content.value.map(
                                    (item, index) => (
                                        <Text key={`${item}:${index}`}>{item}</Text>
                                    ))
                                : 'Địa chỉ chưa được cập nhật'
                            }
                        </Grid.Col>
                        <Grid.Col span={2}>Số điện thoại:</Grid.Col>
                        <Grid.Col span={10}>
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