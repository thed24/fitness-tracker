/* eslint-disable react/no-unstable-nested-components */
// this is according to react navigation docs
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "native-base";
import { DashboardStack } from "../dashboardStack/dashboardStack";
import { LogoutButton } from "./components/logoutButton/logoutButton";
import { CreateWorkout } from "../create/createWorkout";

export type SelectedProfileTab = "schedule" | "history";

export function ProfileStack() {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();

  const getColor = (focused: boolean) => focused ? theme.colors.primary[500] : theme.colors.gray[300];
  const createTab = (name: string, icon: string, component: React.FC<any>) => (
    <Tab.Screen
      name={name}
      component={component}
      options={({ navigation }) => ({
        tabBarInactiveTintColor: theme.colors.gray[300],
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerRight: () => <LogoutButton navigation={navigation} />,
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
      {createTab("Settings", "ios-settings", DashboardStack)}
    </Tab.Navigator>
  );
}
