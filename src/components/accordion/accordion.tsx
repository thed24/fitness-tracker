import { ChevronUpIcon, Heading, HStack, Pressable, useTheme } from "native-base";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Content, Container } from "./accordion.style";

interface Props {
  children: React.ReactNode;
  title: string;
  secondTitle?: string;
}

export function Accordion({ title, children, secondTitle = undefined }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const fadeAnimation = useSharedValue(0);
  const fadeStyle = useAnimatedStyle(() => ({
    height: withSpring(fadeAnimation.value),
  }));

  const rotateAnimation = useSharedValue(0);
  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateAnimation.value}deg` }],
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
  }));

  const handlePress = () => {
    setIsOpen(!isOpen);
    rotateAnimation.value = withSpring(isOpen ? 0 : 180);
    fadeAnimation.value = withSpring(isOpen ? 15 : 250, {
      overshootClamping: true,
      damping: 20,
      stiffness: 100,
    });
  };

  return (
    <Container>
      <HStack>
        <Heading size="md">
          {title}
        </Heading>
        {secondTitle && <Heading fontWeight="medium" ml="auto" mt="auto" size="sm">{secondTitle}</Heading>}
      </HStack>

      <Animated.View style={fadeStyle}>
        <Content>{isOpen && children}</Content>
      </Animated.View>
      <Animated.View style={rotateStyle}>
        <Pressable onPress={handlePress}>
          <ChevronUpIcon color={theme.colors.gray[500]} size="sm" />
        </Pressable>
      </Animated.View>
    </Container>
  );
}
