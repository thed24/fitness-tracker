import { Text, useTheme } from 'native-base';
import React from 'react';

interface BaseProps {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  variant?: 'title' | 'error';
}

type Props = BaseProps & React.ComponentProps<typeof Text>;

export function FormLabel({
  children,
  textAlign = 'left',
  color = 'black',
  variant = 'title',
  ...props
}: Props) {
  const theme = useTheme();
  let content = null;

  switch (variant) {
    case 'title':
      content = (
        <Text
          accessibilityLabel={`${children} label`}
          color={color}
          textAlign={textAlign}
          mb={2}
          fontSize={16}
          fontWeight="semibold"
          {...props}
        >
          {children}
        </Text>
      );
      break;
    case 'error':
      content = (
        <Text
          accessibilityLabel={`${children} label`}
          textAlign={textAlign}
          fontSize="xs"
          color={theme.colors.red[400]}
        >
          {children}
        </Text>
      );
      break;
    default:
      content = null;
  }

  return content;
}
