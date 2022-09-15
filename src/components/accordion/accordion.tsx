import {
  ChevronDownIcon,
  ChevronUpIcon,
  Heading,
  Pressable,
  View,
} from "native-base";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

export function Accordion({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Pressable onPress={() => setIsOpen(!isOpen)}>
      <Heading size="md">{title}</Heading>
      {isOpen && children}
      <View alignSelf="center" marginTop={4}>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </View>
    </Pressable>
  );
}
