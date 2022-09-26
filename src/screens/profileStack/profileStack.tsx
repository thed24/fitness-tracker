import React from "react";
import { useTheme } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardStack } from "../dashboardStack/dashboardStack";
import { CreateWorkout } from "../create/createWorkout";
import { Settings } from "../settings/settings";
import { GradientIcon } from "./components/gradientIcon";
import { IoniconsIconsNames, TabIcon } from "./components/tabIcon";
import { LogoutButton } from "./components/logoutButton";

export type SelectedProfileTab = "schedule" | "history";

export function ProfileStack() {
  const Tab = createBottomTabNavigator();
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
          headerRight: () => createLogoutButton(props),
          tabBarIconStyle: action
            ? {
                paddingLeft: 5,
                paddingRight: 5,
              }
            : {},
          tabBarLabel: action ? "" : name,
          tabBarIcon: ({ focused }) => createIcon(focused),
        })}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.gray[100],
          borderTopWidth: 0,
          height: 50,
          elevation: 5,
          borderRadius: 20,
          width: "95%",
          alignSelf: "center",
          position: "absolute",
          bottom: 10,
          left: 9,
        },
      }}
      initialRouteName="Dashboard"
    >
      {createTab("Dashboard", "ios-home-sharp", DashboardStack)}
      {createTab("Create", "ios-add-sharp", CreateWorkout, true)}
      {createTab("Settings", "ios-settings-sharp", Settings)}
    </Tab.Navigator>
  );
}
