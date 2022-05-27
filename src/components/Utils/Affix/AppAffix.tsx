import { Affix, AffixProps, Button, ButtonVariant, MantineGradient, Transition } from '@mantine/core';

interface Props extends AffixProps {
    label: string;
    onClick: () => void;
    mounted?: boolean;
    variant?: ButtonVariant;
    gradient?: MantineGradient;
    disabled?: boolean;
}

const AppAffix = ({ label, onClick, mounted, variant, gradient, disabled, position }: Props) => {
    return (
        <Affix
            position={position}
            sx={(theme) => ({
                [theme.fn.smallerThan('sm')]: {
                    display: 'none'
                }
            })}
        >
            <Transition transition='slide-up' mounted={!!mounted}>
                {(transitionStyles) => (
                    <Button
                        style={transitionStyles}
                        onClick={onClick}
                        variant={variant}
                        gradient={gradient}
                        disabled={disabled}
                    >
                        {label}
                    </Button>
                )}
            </Transition>
        </Affix>
    );
};

export default AppAffix;