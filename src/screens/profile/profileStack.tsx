/* eslint-disable react/no-unstable-nested-components */
// this is according to react navigation docs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "native-base";
import { Dashboard } from "./screens/dashboard/dashboard";
import { History } from "./screens/history/history";
import { LogoutButton } from "./components/logoutButton/logoutButton";
import { Schedule } from "./screens/schedule/schedule";

export type SelectedProfileTab = "schedule" | "history";

export function ProfileStack() {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  const getColor = (focused: boolean) =>
    focused ? theme.colors.primary[500] : theme.colors.gray[300];

  const createTab = (name: string, icon: string, component: React.FC<any>) => (
    <Tab.Screen
      name={name}
      component={component}
      options={({ navigation }) => ({
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
      {createTab("History", "ios-list", History)}
      {createTab("Dashboard", "ios-speedometer", Dashboard)}
      {createTab("Schedule", "ios-calendar", Schedule)}
    </Tab.Navigator>
  );
}
