/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
import { useTheme } from 'native-base';
import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { CreateWorkout } from '../../../screens/create/createWorkout';
import { Settings } from '../../../screens/settings/settings';
import { DashboardStack } from '../../dashboardStack/dashboardStack';

const DashboardRoute = () => <DashboardStack />;
const CreateRoute = () => <CreateWorkout />;
const SettingsRoute = () => <Settings />;

export function BottomTabBar() {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'dashboard',
      title: 'Dashboard',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'create',
      title: 'Create',
      focusedIcon: 'plus-circle',
      unfocusedIcon: 'plus-circle-outline',
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
    create: CreateRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={theme.colors.primary[500]}
      inactiveColor={theme.colors.gray[500]}
      keyboardHidesNavigationBar
      barStyle={{
        backgroundColor: theme.colors.white,
      }}
    />
  );
}
