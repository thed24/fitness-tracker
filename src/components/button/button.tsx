import React from "react";
import { Button as BaseButton, useTheme } from "native-base";
import {
  ColorSchemeType,
  ColorType,
} from "native-base/lib/typescript/components/types";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface Props {
  disabled?: boolean;
  onPress?: (event: any) => void;
  centered?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  colorScheme?: ColorSchemeType;
  children: React.ReactNode;
  loading?: boolean;
}

export function Button({
  disabled,
  colorScheme,
  size,
  onPress,
  children,
  centered,
  loading,
}: Props) {
  const theme = useTheme();
  const color: ColorType = disabled ? theme.colors.gray[300] : theme.colors.primary[500];

  const animatedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: withTiming(animatedValue.value, { duration: 300 }) }],
    }));

  let width;
  if (size === "sm") {
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
    animatedValue.value = 0.8;
    setTimeout(() => {
      animatedValue.value = 1;
    }, 300);

    if (onPress) onPress(event);
  };

  return (
    <BaseButton
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
    >
      {children}
    </BaseButton>
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
