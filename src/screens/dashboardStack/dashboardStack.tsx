import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { History } from "../history/history";
import { Schedule } from "../schedule/schedule";
import { Dashboard } from "../dashboard/dashboard";

export function DashboardStack() {
  const Tab = createMaterialTopTabNavigator();

  return (
      <Tab.Navigator>
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Schedule" component={Schedule} />
      </Tab.Navigator>
  );
}
