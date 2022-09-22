/* eslint-disable react/no-unstable-nested-components */
// this is according to react navigation docs
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardStack } from "../dashboardStack/dashboardStack";
import { CreateWorkout } from "../create/createWorkout";
import { Settings } from '../settings/settings';

export type SelectedProfileTab = "schedule" | "history";

export function ProfileStack() {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  const getColor = (focused: boolean) => focused ? theme.colors.primary[500] : theme.colors.gray[300];
  const createTab = (name: string, icon: string, component: React.FC<any>) => (
    <Tab.Screen
      name={name}
      component={component}
      options={() => ({
        tabBarIcon: ({ focused }) => (
          <Icon
            name={icon}
            size={25}
            color={getColor(focused)}
            selectionColor={getColor(focused)}
          />
        ),
      })}
    />
  );

  return (
    <Tab.Navigator initialRouteName="Dashboard">
      {createTab("Dashboard", "ios-speedometer", DashboardStack)}
      {createTab("Create", "ios-add-circle-outline", CreateWorkout)}
      {createTab("Settings", "ios-settings", Settings)}
    </Tab.Navigator>
  );
}
