import {
  Box, Center, HStack, Pressable, Text, useTheme,
} from 'native-base';
import React from 'react';

export type SelectedProfileTab = 'schedule' | 'history';

interface Props {
  selected: 'schedule' | 'history';
  setSelected: (selected: 'schedule' | 'history') => void;
}

export function Footer({ selected, setSelected }: Props) {
  const theme = useTheme();

  const onPress = (value: 'schedule' | 'history') => () => {
    setSelected(value);
  };

  return (
    <HStack bg={theme.colors.primary[600]} height="7%" width="100%" position="absolute" bottom="0px" shadow={9}>
      <Pressable opacity={selected === 'history' ? 1 : 0.5} py="2" flex={1} onPress={onPress('history')}>
        <Text color="white" margin="auto" fontSize="16">
          History
        </Text>
      </Pressable>
      <Pressable py="2" flex={1} onPress={onPress('schedule')}>
        <Text color="white" margin="auto" fontSize="16" opacity={selected === 'schedule' ? 1 : 0.6}>
          Schedule
        </Text>
      </Pressable>
    </HStack>
  );
}
