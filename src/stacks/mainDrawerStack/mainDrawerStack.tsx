import React from 'react';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { ProfileStack } from '../profileStack/profileStack';
import { MainDrawer } from './components/mainDrawer';

const Drawer = createDrawerNavigator();

function MainDrawerStackInternal() {
  return (
    <Drawer.Navigator drawerContent={MainDrawer} initialRouteName="Profile">
      <Drawer.Screen name="Profile" component={ProfileStack} />
    </Drawer.Navigator>
  );
}

export const MainDrawerStack = React.memo(MainDrawerStackInternal);