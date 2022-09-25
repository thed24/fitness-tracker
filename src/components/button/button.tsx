import React from "react";
import { Button as BaseButton, useTheme } from "native-base";
import {
  ColorSchemeType,
  ColorType,
} from "native-base/lib/typescript/components/types";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";

interface NewProps {
  disabled?: boolean;
  onPress?: (event: any) => void;
  centered?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  colorScheme?: ColorSchemeType;
  children: React.ReactNode;
  loading?: boolean;
}

type Props = NewProps & Omit<React.ComponentProps<typeof BaseButton>, keyof NewProps>;

const AnimatedButton = Animated.createAnimatedComponent(BaseButton)

export function Button({
  disabled,
  colorScheme,
  size,
  onPress,
  children,
  centered,
  loading,
  ...rest
}: Props) {
  const theme = useTheme();
  const color: ColorType = disabled ? theme.colors.gray[300] : theme.colors.primary[500];

  const animatedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: animatedValue.value }],
    }));

  let width;
  if (size === "xs") {
    width = "15%";
  } else if (size === "sm") {
    width = "25%";
  } else if (size === "md") {
    width = "50%";
  } else if (size === "lg") {
    width = "80%";
  } else {
    width = "100%";
  }

  let nonAnimatedStyle = {};

  if (centered) {
    nonAnimatedStyle = {
      ...nonAnimatedStyle,
      alignSelf: "center",
    };
  }

  const handleOnPress = (event: any) => {
    if (onPress) onPress(event);
    animatedValue.value = withSpring(1.05);
    animatedValue.value = withDelay(100, withSpring(1));
  };

  return (
    <AnimatedButton
      isLoading={loading}
      colorScheme={colorScheme}
      textAlign="center"
      w={width}
      rounded={10}
      disabled={disabled}
      bg={color}
      onPress={handleOnPress}
      style={[animatedStyle, nonAnimatedStyle]}
      _text={{
        color: "white",
        fontWeight: "semibold",
      }}
      {...rest}
    >
      {children}
    </AnimatedButton>
  );
}

Button.defaultProps = {
  disabled: false,
  colorScheme: "solid",
  centered: false,
  size: "md",
  loading: false,
  onPress: () => {},
};
