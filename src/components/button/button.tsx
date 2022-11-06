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

  let mode = 'contained' as "text" | "contained" | "outlined" | "elevated" | "contained-tonal";

  switch (variant) {
    case 'primary':
      mode = 'contained';
      break;
    case 'secondary':
      mode = 'outlined';
      break;
    case 'link':
      mode = 'text';
      break;
    default:
      break;
  }

  return (
    <ButtonBase
      style={{
        borderRadius: 10,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: variant === 'link' ? undefined : theme.colors.primary[500],
        ...style,
      }}
      mode={mode}
      disabled={isLoading || isDisabled}
      loading={isLoading}
      onPress={onPress}
    >
      {children}
    </ButtonBase>
  );
}
