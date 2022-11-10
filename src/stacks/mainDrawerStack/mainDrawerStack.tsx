import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorModeValue, useTheme } from 'native-base';
import { ProfileStack } from '../profileStack/profileStack';
import { MainDrawer } from './components/mainDrawer';

const Drawer = createDrawerNavigator();

function MainDrawerStackInternal() {
  const theme = useTheme();
  const bg = useColorModeValue(theme.colors.white, theme.colors.gray[900]);
  const titleText = useColorModeValue(theme.colors.black, theme.colors.white);

  return (
    <Drawer.Navigator drawerContent={MainDrawer} initialRouteName="Profile">
      <Drawer.Screen
        options={{
          headerStyle: { backgroundColor: bg },
          headerTitleStyle: { color: titleText },
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Drawer.Navigator>
  );
}

export const MainDrawerStack = React.memo(MainDrawerStackInternal);
