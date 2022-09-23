import React from "react";
import { useTheme } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardStack } from "../dashboardStack/dashboardStack";
import { CreateWorkout } from "../create/createWorkout";
import { Settings } from "../settings/settings";
import { GradientIcon } from "./components/gradientIcon";
import { TabIcon } from "./components/tabIcon";
import { LogoutButton } from "./components/logoutButton";

export type SelectedProfileTab = "schedule" | "history";

export function ProfileStack() {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  const createTab = (
    name: string,
    icon: string,
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
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => <LogoutButton navigation={props.navigation} />,
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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.gray[50],
          borderTopWidth: 0,
          height: 60,
          elevation: 5,
          borderRadius: 30,
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
