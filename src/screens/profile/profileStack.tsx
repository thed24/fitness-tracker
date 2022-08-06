/* eslint-disable react/no-unstable-nested-components */
// this is according to react navigation docs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { Dashboard } from './dashboard/dashboard';
import { History } from './history/history';
import { LogoutButton } from './logoutButton/logoutButton';
import { Schedule } from './schedule/schedule';

export type SelectedProfileTab = "schedule" | "history";

export function ProfileStack() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen name="History" component={History} options={({ navigation }) => ({
        headerRight: () => <LogoutButton navigation={navigation} />,
        tabBarIcon: ({ color, size }) => <Icon name="ios-list" color={color} size={size} />,
      })} />
      <Tab.Screen name="Dashboard" component={Dashboard} options={({ navigation }) => ({
        headerRight: () => <LogoutButton navigation={navigation} />,
        tabBarIcon: ({ color, size }) => <Icon name="ios-speedometer" color={color} size={size} />,
      })} />
      <Tab.Screen name="Schedule" component={Schedule} options={({ navigation }) => ({
        headerRight: () => <LogoutButton navigation={navigation} />,
        tabBarIcon: ({ color, size }) => <Icon name="ios-calendar" color={color} size={size} />,
      })} />
    </Tab.Navigator>
  );
}
