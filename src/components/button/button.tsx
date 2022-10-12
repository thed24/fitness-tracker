import React from "react";
import { Button as BaseButton, useTheme } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

interface NewProps {
  disabled?: boolean;
  onPress?: (event: any) => void;
  centered?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  loading?: boolean;
}

type Props = NewProps &
  Omit<React.ComponentProps<typeof BaseButton>, keyof NewProps>;

const AnimatedButton = Animated.createAnimatedComponent(BaseButton);

export function Button({
  disabled,
  size,
  onPress,
  children,
  centered,
  loading,
  ...rest
}: Props) {
  const theme = useTheme();
  const color: ColorType = disabled
    ? theme.colors.gray[500]
    : theme.colors.primary[500];

  const animatedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: animatedValue.value }],
  }));

  let nonAnimatedStyle = {};

  if (centered) {
    nonAnimatedStyle = {
      ...nonAnimatedStyle,
      alignSelf: "center",
    };
  }

  let width;

  switch (size) {
    case "xs":
      width = "15%";
      break;
    case "sm":
      width = "25%";
      break;
    case "md":
      width = "48%";
      break;
    case "lg":
      width = "80%";
      break;
    case "xl":
      width = "100%";
      break;
    default:
      width = "50%";
  }

  const handleOnPress = (event: any) => {
    if (onPress) onPress(event);
    animatedValue.value = withSpring(1.05);
    animatedValue.value = withDelay(100, withSpring(1));
  };

  return (
    <AnimatedButton
      isLoading={loading}
      textAlign="center"
      w={width}
      rounded={10}
      disabled={disabled}
      color={color}
      borderColor={color}
      onPress={handleOnPress}
      style={[animatedStyle, nonAnimatedStyle]}
      {...rest}
    >
      {children}
    </AnimatedButton>
  );
}

Button.defaultProps = {
  disabled: false,
  centered: false,
  size: "md",
  loading: false,
  onPress: () => {},
};
