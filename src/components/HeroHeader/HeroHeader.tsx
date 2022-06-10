import { Title, Text, Button, Container, useMantineTheme, Box } from '@mantine/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dots } from './Dots';

import useStyles from './HeroHeader.styles';

interface Props {
    onFirstButtonClick?: () => void;
    onSecondButtonClick: () => void;
}

export function HeroHeader({ onSecondButtonClick, onFirstButtonClick }: Props) {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    return (
        <Box className={classes.wrapper}>
            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    Cung cấp{' '}
                    <Text component='span' color={theme.primaryColor} inherit>
                        tổ yến{' '}
                    </Text>
                    các loại
                </Title>

                <Container p={0} size={600}>
                    <Text size='lg' color='dimmed' className={classes.description}>
                        Cơ sở yến sào Ms. Tưởng chuyên cung cấp các loại Yến Sào tại Nha Trang
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Button
                        className={classes.control}
                        size='lg'
                        variant='default'
                        color='gray'
                        onClick={onFirstButtonClick}
                        leftIcon={<FontAwesomeIcon icon={faFacebookF} />}
                    >
                        Facebook
                    </Button>
                    <Button
                        className={classes.control}
                        size='lg'
                        onClick={onSecondButtonClick}
                        leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    >
                        Sản phẩm
                    </Button>
                </div>
            </div>
        </Box>
    );
}