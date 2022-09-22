import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { useTheme } from "native-base";
import { History } from "../history/history";
import { Schedule } from "../schedule/schedule";
import { Profile } from "../profile/profile";

export function DashboardStack() {
  const Tab = createMaterialTopTabNavigator();

  const { width } = Dimensions.get("window");
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialLayout={{
        width,
      }}
      screenOptions={{
        swipeEnabled: false,
        tabBarLabelStyle: { fontSize: 12 },
      }}
      initialRouteName="Profile"
    >
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Schedule" component={Schedule} />
    </Tab.Navigator>
  );
}
