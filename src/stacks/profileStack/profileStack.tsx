import React from "react";
import { useTheme } from "native-base";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { DashboardStack } from "../dashboardStack/dashboardStack";
import { GradientIcon } from "./components/gradientIcon";
import { IoniconsIconsNames, TabIcon } from "./components/tabIcon";
import { LogoutButton } from "./components/logoutButton";
import { CreateWorkout } from "../../screens/create/createWorkout";
import { Settings } from "../../screens/settings/settings";

export type SelectedProfileTab = "schedule" | "history";

export function ProfileStack() {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();

  const createLogoutButton = (props: any) => <LogoutButton {...props} />;

  const createTab = (
    name: string,
    icon: IoniconsIconsNames,
    component: React.FC<any>,
    action: boolean = false
  ) => {
    const createIcon = (focused: boolean) =>
      action ? (
        <GradientIcon name={icon} focused={focused} />
      ) : (
        <TabIcon name={icon} focused={focused} />
      );

    return (
      <Tab.Screen
        name={name}
        component={component}
        options={(props) => ({
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => createIcon(focused),
        })}
      />
    );
  };

  return (
    <Tab.Navigator
      keyboardHidesNavigationBar
      style={{
        backgroundColor: theme.colors.gray[300],
      }}
      barStyle={{
        backgroundColor: theme.colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      initialRouteName="Dashboard"
    >
      {createTab("Dashboard", "ios-home-sharp", DashboardStack)}
      {createTab("Create", "ios-add-sharp", CreateWorkout, true)}
      {createTab("Settings", "ios-settings-sharp", Settings)}
    </Tab.Navigator>
  );
}
