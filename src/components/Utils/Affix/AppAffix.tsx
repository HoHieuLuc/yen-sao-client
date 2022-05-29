import { Affix, AffixProps, Button, ButtonVariant, MantineGradient } from '@mantine/core';

interface Props extends AffixProps {
    label: string;
    onClick: () => void;
    variant?: ButtonVariant;
    gradient?: MantineGradient;
    disabled?: boolean;
    buttonIcon?: JSX.Element;
}

const AppAffix = ({ label, onClick, variant, gradient,
    disabled, position, buttonIcon }: Props
) => {
    return (
        <Affix
            position={position}
            sx={(theme) => ({
                [theme.fn.smallerThan('sm')]: {
                    display: 'none'
                }
            })}
        >
            <Button
                onClick={onClick}
                variant={variant}
                gradient={gradient}
                disabled={disabled}
                sx={{
                    maxWidth: '1rem',
                    transition: 'all 0.8s ease-in-out',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    '&:hover': {
                        maxWidth: '30rem',
                    },
                }}
                leftIcon={buttonIcon}
                radius='xl'
            >
                {label}
            </Button>
        </Affix>
    );
};

export default AppAffix;