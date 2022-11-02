import { useTheme } from 'native-base';
import React from 'react';
import { Button as ButtonBase } from 'react-native-paper';

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: 'primary' | 'secondary' | 'link';
  style?: React.ComponentProps<typeof ButtonBase>['style'];
}

export function Button({
  children,
  onPress,
  style,
  isLoading = false,
  isDisabled = false,
  variant = 'primary',
}: Props) {
  const theme = useTheme();

  const colors = {
    primary: {
      backgroundColor: theme.colors.primary[500],
      color: theme.colors.white,
    },
    secondary: {
      backgroundColor: theme.colors.white,
      color: theme.colors.black,
    },
    link: {
      backgroundColor: 'transparent',
      color: theme.colors.primary[500],
    },
  };

  return (
    <ButtonBase
      style={{
        borderRadius: 10,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      mode="contained"
      buttonColor={colors[variant].backgroundColor}
      textColor={colors[variant].color}
      disabled={isLoading || isDisabled}
      loading={isLoading}
      onPress={onPress}
    >
      {children}
    </ButtonBase>
  );
}
