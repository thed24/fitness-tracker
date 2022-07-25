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
    <Box flex={1} bg="white" width="100%" position="absolute" bottom="-1" alignSelf="center">
      <Center flex={1} />
      <HStack bg={theme.colors.primary[800]} height="30%" shadow={9}>
        <Pressable opacity={selected === 'history' ? 1 : 0.5} py="2" flex={1} onPress={onPress('history')}>
          <Center>
            <Text color="white" fontSize="16">
              History
            </Text>
          </Center>
        </Pressable>
        <Pressable opacity={selected === 'schedule' ? 1 : 0.6} py="2" flex={1} onPress={onPress('schedule')}>
          <Center>
            <Text color="white" fontSize="16">
              Schedule
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
