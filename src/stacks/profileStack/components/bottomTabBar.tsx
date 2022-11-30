/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
import { useColorModeValue, useTheme } from 'native-base';
import React, { useState } from 'react';
import { BottomNavigation, TouchableRipple } from 'react-native-paper';
import { Settings } from '../../../screens/settings/settings';
import { SocialScreen } from '../../../screens/social/social';
import { DashboardStack } from '../../dashboardStack/dashboardStack';

const DashboardRoute = () => <DashboardStack />;
const SocialRoute = () => <SocialScreen />;
const SettingsRoute = () => <Settings />;

export function BottomTabBar() {
  const theme = useTheme();
  const bg = useColorModeValue(theme.colors.white, theme.colors.gray[900]);

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {
      key: 'social',
      title: 'Social',
      focusedIcon: 'account-group',
      unfocusedIcon: 'account-group-outline',
    },
    {
      key: 'dashboard',
      title: 'Dashboard',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardRoute,
    settings: SettingsRoute,
    social: SocialRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={theme.colors.primary[500]}
      inactiveColor={theme.colors.gray[500]}
      keyboardHidesNavigationBar
      labeled={false}
      renderTouchable={({ children, ...rest }) => (
        <TouchableRipple {...rest} style={{ flex: 1, marginTop: -13 }}>
          {children}
        </TouchableRipple>
      )}
      barStyle={{
        backgroundColor: bg,
        height: 50,
      }}
    />
  );
}
