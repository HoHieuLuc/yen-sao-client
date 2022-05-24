import useStyles from './Footer.styles';

import { Text, Container, Image, Grid } from '@mantine/core';

import { AllPage } from '../../types';

interface Props {
    data: AllPage;
}

const AppFooter = ({ data }: Props) => {
    const { classes } = useStyles();
    return (
        <footer className={classes.footer}>
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
                        <Grid.Col span={10}>{data.page.address.content.value.map(
                            (item, index) => (
                                <Text key={`${item}:${index}`}>{item}</Text>
                            ))}
                        </Grid.Col>
                        <Grid.Col span={2}>Số điện thoại:</Grid.Col>
                        <Grid.Col span={10}>{data.page.phone.content.value.map(
                            (item, index) => (
                                <Text key={`${item}:${index}`}>{item}</Text>
                            ))}
                        </Grid.Col>
                    </Grid>
                </div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © {new Date().getFullYear()}. All rights reserved.
                </Text>
            </Container>
        </footer>
    );
};

export default AppFooter;