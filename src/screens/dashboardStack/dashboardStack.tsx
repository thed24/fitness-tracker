import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { History } from "../history/history";
import { Schedule } from "../schedule/schedule";
import { Profile } from "../profile/profile";

export function DashboardStack() {
  const Tab = createMaterialTopTabNavigator();

  return (
      <Tab.Navigator initialRouteName="Profile">
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Schedule" component={Schedule} />
      </Tab.Navigator>
  );
}
