import { ChevronUpIcon, Heading, Pressable } from "native-base";
import React, { useLayoutEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Content, Container } from "./accordion.style";

interface Props {
  children: React.ReactNode;
  title: string;
}

export function Accordion({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

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
    fadeAnimation.value = withSpring(isOpen ? 0 : 250);
    rotateAnimation.value = withSpring(isOpen ? 0 : 180);
  };

  return (
    <Container>
      <Heading size="md">{title}</Heading>
      <Animated.View style={fadeStyle}>
        <Content>{isOpen && children}</Content>
      </Animated.View>
      <Animated.View style={rotateStyle}>
        <Pressable onPress={handlePress}>
          <ChevronUpIcon />
        </Pressable>
      </Animated.View>
    </Container>
  );
}