import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { useStore } from 'store';
import { HStack, Text, useColorModeValue, useTheme, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export function MainDrawer({
  state,
  navigation,
  descriptors,
}: DrawerContentComponentProps) {
  const { setUser, user } = useStore();
  const theme = useTheme();
  const bg = useColorModeValue(theme.colors.white, theme.colors.gray[700]);

  const userName = user === null ? 'Guest' : `${user.username}`;
  const title = user?.title?.name;

  const headerIcon = useCallback(() => {
    const text = title ? (
      <VStack>
        <Text fontSize={20}>{userName}</Text>
        <Text fontSize={14}>{title}</Text>
      </VStack>
    ) : (
      <Text my="auto" fontSize={20}>{userName}</Text>
    );

    return (
      <HStack>
        <Icon style={{ marginVertical: "auto", marginRight: 9 }} name="user-circle" size={30} color={theme.colors.primary[500]} />
        {text}
      </HStack>
    );
  },
    [theme.colors.primary, userName, title]
  );


  return (
    <DrawerContentScrollView style={{
      backgroundColor: bg,
    }}>
      <DrawerItem label="" onPress={() => null} icon={headerIcon} />

      <DrawerItemList
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />

      <DrawerItem label="Logout" onPress={() => setUser(null)} />
    </DrawerContentScrollView>
  );
}
