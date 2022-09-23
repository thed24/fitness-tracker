import { useTheme } from "native-base";
import React, { useEffect } from "react";
import Animated, {
  interpolateColor,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  name: string;
  focused: boolean;
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export function TabIcon({ focused, name }: Props) {
  const theme = useTheme();
  const colors = [theme.colors.gray[300], theme.colors.primary[500]];

  const animatedColorValue = useSharedValue(0);

  useEffect(() => {
    animatedColorValue.value = withTiming(focused ? 1 : 0, { duration: 500 });
  }, [focused, animatedColorValue]);

  return (
    <AnimatedIcon
      name={name}
      size={35}
      color={interpolateColor(
        animatedColorValue.value,
        [0, 1],
        colors
      )}
    />
  );
}
